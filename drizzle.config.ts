import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()

type driverType = 'postgres' | 'mysql'
type dialectType = 'postgresql' | 'mysql'

const driver:driverType = (process.env.DB_DRIVER || 'postgres') as 'postgres' || 'mysql'
const dialect:dialectType = driver === 'postgres' ? 'postgresql' : 'mysql'

export default defineConfig({
    out: `./migrations/${driver}`,
    schema: './src/database/schemas/active/',
    dialect,
    dbCredentials: {
        url: process.env.DATABASE_URL ?? ""
    },
    migrations: {
        table: '__drizzle_migrations',
        schema: 'drizzle'
    }
})
