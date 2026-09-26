import { 
  type AnyMySqlColumn,
  mysqlTable,
  int,
  json,
  timestamp,
  varchar,
  uniqueIndex
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { CitiesTable } from './cities'

export const CityWeatherTable = mysqlTable(
  'cities_weather',
  {
    id: varchar('id', { length: 36 }).notNull().primaryKey(),
    cityId: int('city_id').notNull().references((): AnyMySqlColumn => CitiesTable.id),
    weatherData: json('weather_data').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('update_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    // Virtual generated column: 1 when active, NULL when deleted
    activeKey: varchar('active_key', { length: 1 }).generatedAlwaysAs(
      sql`CASE WHEN deleted_at IS NULL THEN '1' ELSE NULL END`
    ),
  },
  (table) => [
    // Unique partial index ignoring soft-deleted rows
    uniqueIndex('idx_active_cities_weather').on(
        table.cityId,
        table.createdAt,
        table.activeKey
    )
  ]
)

// Inferred Types
export type CityWeather = InferSelectModel<typeof CityWeatherTable>
export type NewCityWeather = InferInsertModel<typeof CityWeatherTable>