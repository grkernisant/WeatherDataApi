import dotenv from 'dotenv'

dotenv.config()

type AppConfig = {
  PORT: number,
  APP_NB_MAX_REPLICAS: number,

  DB_HOST: string,
  DB_PORT: number,
  DB_USER: string,
  DB_PASSWORD: string,
  DB_NAME: string,
  DATABASE_URL: string,

  WEATHER_API_KEY: string,
  WEATHER_CITY_ENDPOINT: string,
  WEATHER_RATE_LIMIT_PER_MIN: number,
  WEATHER_WEATHER_ENDPOINT: string,
}

const env: AppConfig = {
  PORT: Number(process.env.PORT ?? 3000),
  APP_NB_MAX_REPLICAS: Number(process.env.APP_NB_MAX_REPLICAS ?? 1),
  DB_HOST: process.env.DB_HOST ?? "No db host provided",
  DB_PORT: Number(process.env.DB_HOST ?? 5432),
  DB_USER: process.env.DB_USER ?? "No db user provided",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "No db pwd provided",
  DB_NAME: process.env.DB_NAME ?? "No db name provided",
  DATABASE_URL: process.env.DATABASE_URL ?? "No database url provided",
  WEATHER_API_KEY: process.env.WEATHER_API_KEY ?? "No API key provided",
  WEATHER_CITY_ENDPOINT: process.env.WEATHER_CITY_ENDPOINT ?? "No city endpoint",
  WEATHER_WEATHER_ENDPOINT: process.env.WEATHER_WEATHER_ENDPOINT ?? "No city endpoint",
  WEATHER_RATE_LIMIT_PER_MIN: Number(process.env.WEATHER_RATE_LIMIT_PER_MIN ?? 60)
}

export default env