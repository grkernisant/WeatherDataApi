import { 
  pgTable, 
  serial, 
  varchar, 
  char, 
  numeric, 
  uuid, 
  timestamp, 
  uniqueIndex 
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const CitiesTable = pgTable(
  'cities',
  {
    id: serial('id').primaryKey(),
    city: varchar('city', { length: 50 }).notNull(),
    state: varchar('state', { length: 25 }).notNull(),
    countryCode: char('country_code', { length: 2 }).notNull(),
    // +- 90.0000
    latitude: numeric('latitude', { precision: 6, scale: 4 }).notNull(),
    // +- 180.0000
    longitude: numeric('longitude', { precision: 7, scale: 4 }).notNull(),
    createdBy: uuid('created_by').notNull(),
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
    uniqueIndex('idx_active_cities_country_state_city')
      .on(table.countryCode, table.state, table.city)
      .where(sql`deleted_at IS NULL`),
  ]
)

// Inferred Types
export type City = InferSelectModel<typeof CitiesTable>
export type NewCity = InferInsertModel<typeof CitiesTable>