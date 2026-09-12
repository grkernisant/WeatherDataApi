import {
    isSameDay,
    isSameHour,
    isSameMinute,
    isSameMonth,
    isSameSecond,
} from 'date-fns'
import { RateLimitPeriod } from "../../types/apis";

export class RateLimit
{
    limit: number;
    period: RateLimitPeriod;
    lastModified: Date;
    counter: number;

    constructor(l: number, p: RateLimitPeriod)
    {
        this.limit = l;
        this.period = p;
        this.lastModified = new Date();
        this.counter = 0;
    }

    isSamePeriod(a: Date, b?: Date): boolean {
        if (b === undefined) {
            b = this.lastModified
        }

        let isSame = false
        switch(this.period) {
            case 'ms': isSame = a.getTime() === b.getTime(); break;
            case 's': isSame = isSameSecond(a, b); break;
            case 'min': isSame = isSameMinute(a, b); break;
            case 'hour': isSame = isSameHour(a, b); break;
            case 'day': isSame = isSameDay(a, b); break;
            case 'month': isSame = isSameMonth(a, b); break;
        }

        return isSame
    }

    resetCounter() {
        this.counter = 0;
    }

    validate(): boolean {
        if (this.counter > this.limit) return false

        const now = new Date()
        if (!this.isSamePeriod(now)) {
            this.resetCounter()
        }

        this.incr()

        return true;
    }

    incr() {
        this.counter++;
    }
}