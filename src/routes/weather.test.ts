import { describe, expect, it } from 'bun:test'
import env from '../config/env'

describe('Weather endpoint API test', () => {
    it('Can parse the env variables correctly', () => {
        const geoEndpoint = "http://api.openweathermap.org/geo/1.0/direct"
        const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather"
        expect(env.WEATHER_CITY_ENDPOINT).toBe(geoEndpoint)
        expect(env.WEATHER_WEATHER_ENDPOINT).toBe(weatherEndpoint)
    })
})