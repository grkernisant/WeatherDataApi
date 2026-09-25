import { v7 as uuidv7 } from 'uuid'
import { eq, desc } from 'drizzle-orm'
import env from '../../config/env'
import { db, CitiesTable } from '../../database/index'
import type { City, NewCity } from '../../database/index'
import type { CityWithCoordinates } from '../../types/cities'
import { getCity } from '../../apis/openweathermap'

export const find = async (name: string): Promise<City[]> => {
    const result: City[] = await db
        .select()
        .from(CitiesTable)
        .where(eq(CitiesTable.city, name))

    if (result.length > 0) {
        return result
    }

    const apiResult:CityWithCoordinates | undefined = await getCity(name)
    if (apiResult !== undefined) {
        const insertData: NewCity = {
            city: apiResult.name,
            state: apiResult.state ?? '',
            countryCode: apiResult.country,
            latitude: apiResult.lat.toString(),
            longitude: apiResult.lon.toString(),
            createdBy: uuidv7()
        }
        if (env.DB_DRIVER === 'postgres') {
            return await db.insert(CitiesTable).values(insertData).returning()
        } else {
            await db.insert(CitiesTable).values(insertData).$returningId()
            return await db.select()
                .from(CitiesTable)
                .orderBy(desc(CitiesTable.id))
                .limit(1)
        }
    }

    return []
}
