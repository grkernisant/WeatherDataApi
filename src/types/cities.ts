import * as z from 'zod'

export const CityWithCoordinatesSchema = z.object({
    name: z.string().max(50),
    lat: z.number(),
    lon: z.number(),
    country: z.string().length(2),
    state: z.string().max(25).optional(),
})
export type CityWithCoordinates = z.infer<typeof CityWithCoordinatesSchema>

export const PartialCityWeatherSchema = z.object({
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    sea_level: z.number(),
    grnd_level: z.number(),
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
    deg: z.number()
  })
})
export type PartialCityWeather = z.infer<typeof PartialCityWeatherSchema>