import {
  mysqlTable,
  int,
  varchar,
  char,
  decimal,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const CitiesTable = mysqlTable(
  'cities',
  {
    id: int().primaryKey().autoincrement(),
    city: varchar('city', { length: 50 }).notNull(),
    state: varchar('state', { length: 25 }).notNull(),
    countryCode: char('country_code', { length: 2 }).notNull(),
    latitude: decimal('latitude', { precision: 6, scale: 4 }).notNull(),
    longitude: decimal('longitude', { precision: 7, scale: 4 }).notNull(),
    createdBy: varchar('created_by', { length: 36 }).notNull(), // UUID equivalent in MySQL
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    // Virtual generated column: 1 when active, NULL when deleted
    activeKey: varchar('active_key', { length: 1 }).generatedAlwaysAs(
      sql`CASE WHEN deleted_at IS NULL THEN '1' ELSE NULL END`
    ),
  },
  (table) => [
    // Unique index using the generated column
    uniqueIndex('idx_active_cities_country_state_city').on(
      table.countryCode,
      table.state,
      table.city,
      table.activeKey
    ),
  ]
)

// Inferred Types
export type City = InferSelectModel<typeof CitiesTable>
export type NewCity = InferInsertModel<typeof CitiesTable>
