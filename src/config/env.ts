import dotenv from 'dotenv'

dotenv.config()

type AppConfig = {
  PORT: number,
  WEATHER_API_KEY: string,
  WEATHER_CITY_ENDPOINT: string,
  WEATHER_WEATHER_ENDPOINT: string,
}

const env: AppConfig = {
  PORT: Number(process.env.PORT ?? 3000),
  WEATHER_API_KEY: process.env.WEATHER_API_KEY ?? "No API key provided",
  WEATHER_CITY_ENDPOINT: process.env.WEATHER_CITY_ENDPOINT ?? "No city endpoint",
  WEATHER_WEATHER_ENDPOINT: process.env.WEATHER_WEATHER_ENDPOINT ?? "No city endpoint",
}

export default env