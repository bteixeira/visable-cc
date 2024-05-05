import {formatISO, subDays} from 'date-fns'

export function subtractDate (date: Date, days: number): Date {
    return subDays(date, days)
}

export function formatISODate (date: Date) {
    return formatISO(date, {representation: 'date'})
}

export function getUpdatedSinceDate (daysAgo: number): string {
    const now = new Date()
    const updatedSince = subtractDate(now, daysAgo)
    console.log('Updated since', daysAgo, updatedSince)
    return formatISODate(updatedSince)
}