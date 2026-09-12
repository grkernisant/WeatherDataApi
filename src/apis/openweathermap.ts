import env from '../config/env.ts'
import type { RateLimitPeriod } from '../types/apis'
import { getRateLimit } from '../utils/api.ts'
import { CityWithCoordinatesSchema, PartialCityWeatherSchema } from '../types/cities'
import type { CityWithCoordinates, PartialCityWeather } from '../types/cities'

const OpenWeatherApi = 'OPENWEATHER_API'
const OpenWeatherPeriod:RateLimitPeriod = 'min'
const requestPerMinute = Math.floor(env.WEATHER_RATE_LIMIT_PER_MIN / env.APP_NB_MAX_REPLICAS)

export const getCity = async (name: string): Promise<CityWithCoordinates | undefined> => {
  const rl = getRateLimit(OpenWeatherApi, requestPerMinute, OpenWeatherPeriod)
  if (!rl.validate()) return undefined

  const params = {
    appid: env.WEATHER_API_KEY,
    q: name,
  }
  const url = `${env.WEATHER_CITY_ENDPOINT}?${new URLSearchParams(params)}`
  const response = await fetch(url)
  const rawResponse = await response.json() as unknown as CityWithCoordinates[]
  const parsedCityResponse = CityWithCoordinatesSchema.safeParse(rawResponse[0])
  return parsedCityResponse.success ? parsedCityResponse.data : undefined
}

export const getWeather = async (lat: number, lon: number): Promise<PartialCityWeather | undefined> => {
  const rl = getRateLimit(OpenWeatherApi, requestPerMinute, OpenWeatherPeriod)
  if (!rl.validate()) return undefined

  const params = {
    appid: env.WEATHER_API_KEY,
    lat: lat.toString(),
    lon: lon.toString(),
    units: 'metric',
  };

  const url = `${env.WEATHER_WEATHER_ENDPOINT}?${new URLSearchParams(params)}`
  const response:Response = await fetch(url)
  const parsedCityWeather = PartialCityWeatherSchema.safeParse(await response.json())
  return parsedCityWeather.success ? parsedCityWeather.data : undefined
}
