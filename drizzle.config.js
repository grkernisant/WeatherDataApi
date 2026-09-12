import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
    out: './migrations',
    schema: './src/database/schemas',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? ""
    },
    migrations: {
        table: '__drizzle_migrations',
        schema: 'drizzle'
    }
})
