import { RateLimitPeriod } from '../types/apis'
import { RateLimit } from './api/RateLimit'

const rateLimits: Map<string, RateLimit> = new Map()
export const getRateLimit = (name: string, limit: number, period: RateLimitPeriod): RateLimit => {
    const obj = new RateLimit(limit, period)
    return rateLimits.getOrInsert(name, obj)
}