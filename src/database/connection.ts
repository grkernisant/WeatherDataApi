import env from '../config/env.ts'
import { drizzle as DrizzlePostGres } from 'drizzle-orm/node-postgres'
import { drizzle as DrizzleMySQL } from 'drizzle-orm/mysql2'

export const db = env.DB_DRIVER === 'mysql' ? DrizzleMySQL(env.DATABASE_URL) : DrizzlePostGres(env.DATABASE_URL)