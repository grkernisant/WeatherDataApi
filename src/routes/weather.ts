import { Hono } from 'hono'
import { startOfHour } from 'date-fns'
import env from '../config/env'
import { maskString } from '../utils/string'
import { find as findCity } from '../features/cities/service'
import { getWeatherData } from '../features/weather/service'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello Weather Home!',
    api: {
        city_url: env.WEATHER_CITY_ENDPOINT,
        weather_url: env.WEATHER_WEATHER_ENDPOINT,
        api_key: maskString(env.WEATHER_API_KEY)
    }
  })
})

app.get('/city/:code', async (c) => {
  const rawParam = c.req.param('code')
  // Replace '+' with space first, then decode percent-encoded sequences
  const code = decodeURIComponent(rawParam.replace(/\+/g, ' '))
  const cities = await findCity(code)
  if (cities.length === 0) {
    return c.json({ error: `not found`, city: code}, 404)
  }

  const city = cities[0]
  const previousHour = startOfHour(new Date())
  const weather = await getWeatherData(city, previousHour)
  return c.json({
    code,
    weather: weather[0]?.weatherData 
  })
})

export default app