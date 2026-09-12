import { eq } from 'drizzle-orm'
import { db, CitiesTable } from '../../database/index'
import type { City, NewCity } from '../../database/index'

export const find = async (name: string): Promise<City[]> => {
    const result: City[] = await db
        .select()
        .from(CitiesTable)
        .where(eq(CitiesTable.city, name))

    if (result.length > 0) {
        return result
    }

    return []
}
