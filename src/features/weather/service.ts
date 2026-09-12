import { v7 as uuidv7 } from 'uuid'
import { eq, gte, lte, and, SQL } from 'drizzle-orm'
import {
    db,
    CityWeatherTable,
    type City, CityWeather, NewCityWeather
} from '../../database/index.ts'
import { getWeather } from '../../apis/openweathermap.ts'

export const getWeatherData = async (city: City, from?: Date, to?: Date): Promise<CityWeather[]> => {
    const filters: SQL[] = []

    filters.push(eq(CityWeatherTable.cityId, city.id))
    if (from) filters.push(gte(CityWeatherTable.createdAt, from))
    if (to) filters.push(lte(CityWeatherTable.createdAt, to))

    const rows: CityWeather[] = await db
        .select()
        .from(CityWeatherTable)
        .where(and(... filters))
    
    if (rows.length > 0) return rows

    const apiResult = await getWeather(Number(city.latitude), Number(city.longitude))
    if (apiResult !== undefined) {
        const insertData: NewCityWeather = {
            id: uuidv7(),
            cityId: city.id,
            weatherData: apiResult,
        }
        return db.insert(CityWeatherTable).values(insertData).returning()
    }

    return []
}