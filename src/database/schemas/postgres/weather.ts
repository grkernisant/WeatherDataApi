import { 
  type AnyPgColumn,
  pgTable,
  integer,
  json, 
  uuid, 
  timestamp, 
  uniqueIndex 
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { CitiesTable } from './cities'

export const CityWeatherTable = pgTable(
  'cities_weather',
  {
    id: uuid('id').notNull().primaryKey(),
    cityId: integer('city_id').notNull().references((): AnyPgColumn => CitiesTable.id),
    weatherData: json('weather_data').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('update_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (table) => [
    // Unique partial index ignoring soft-deleted rows
    uniqueIndex('idx_active_cities_weather')
      .on(table.cityId, table.createdAt)
      .where(sql`deleted_at IS NULL`),
  ]
)

// Inferred Types
export type CityWeather = InferSelectModel<typeof CityWeatherTable>
export type NewCityWeather = InferInsertModel<typeof CityWeatherTable>