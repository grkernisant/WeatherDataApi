import { Hono } from 'hono'
import env from '../config/env'
import { maskString } from '../utils/string'

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
  return c.json({ code })
})

export default app