import exec from 'k6/execution'
import { extractGroup } from './test-scenarios.ts'

export const logError = (validationCheck: string) => {
    console.error('\x1b[31m', `Error in '${extractGroup()}' in '${exec.scenario.name}' scenario. ${validationCheck}`)
}

export const getRandomValueFrom = <T>(array: Array<T>): T => array[Math.floor(Math.random() * array.length)]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (value: any) => ({
    toBeNull: (): boolean => {
        const result = value === null

        if (!result) {
            logError(`Expected ${value} to be null.`)
        }

        return result
    },
    toNotBeNull: (): boolean => {
        const result = value !== null

        if (!result) {
            logError(`Expected ${value} NOT to be null.`)
        }

        return result
    },
    toHaveLength: (length: number): boolean => {
        if (typeof value !== 'string' && !Array.isArray(value)) {
            logError(`Expected ${JSON.stringify(value)} to have length ${length}, but passed value is not an array or string.`)

            return false
        }

        const result = value.length === length

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} to have length ${length}, but got ${value?.length}.`)
        }

        return result
    },
    toNotHaveLength: (length: number): boolean => {
        if (typeof value !== 'string' && !Array.isArray(value)) {
            logError(`Expected ${JSON.stringify(value)} NOT to have length ${length}, but passed value is not an array or string.`)

            return false
        }

        const result = value.length !== length

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} NOT to have length ${length}, but got ${value?.length}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toEqual: (expected: any): boolean => {
        const isArrayComparison = Array.isArray(value) && Array.isArray(expected)

        const result = isArrayComparison
            ? value.length === expected.length && value.every((item, index) => item === expected[index])
            : value === expected

        if (!result) {
            logError(`Expected ${expected}, but got ${value}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNotEqual: (expected: any): boolean => {
        const isArrayComparison = Array.isArray(value) && Array.isArray(expected)

        const result = isArrayComparison
            ? value.length === expected.length && value.every((item, index) => item !== expected[index])
            : value !== expected

        if (!result) {
            logError(`Expected NOT ${expected}, but got ${value}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toContain: (expected: any): boolean => {
        if (typeof value !== 'string' && !Array.isArray(value)) {
            logError(`Expected ${value} to contain ${expected}, but passed value is not an array or string.`)

            return false
        }

        const result = Array.isArray(expected) ? expected.some(item => value.includes(item)) : value.includes(expected)

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} to contain ${expected}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNotContain: (expected: any): boolean => {
        if (typeof value !== 'string' && !Array.isArray(value)) {
            logError(`Expected ${value} to NOT contain ${expected}, but passed value is not an array or string.`)

            return false
        }

        const result = Array.isArray(expected) ? expected.every(item => !value.includes(item)) : !value.includes(expected)

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} to NOT contain ${expected}.`)
        }

        return result
    },
    toBeDefined: (): boolean => {
        const result = value !== undefined

        if (!result) {
            logError(`Expected ${value} to be defined.`)
        }

        return result
    },
    toNotBeDefined: (): boolean => {
        const result = value === undefined

        if (!result) {
            logError(`Expected ${value} to not be defined.`)
        }

        return result
    },
    toBeGreaterThan: (expected: number | string): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value > expected

        if (!result) {
            logError(`Expected ${value} to be greater than to ${expected}.`)
        }

        return result
    },
    toBeGreaterThanOrEqual: (expected: number | string): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value >= expected

        if (!result) {
            logError(`Expected ${value} to be greater than or equal to ${expected}.`)
        }

        return result
    },
    toBeLessThan: (expected: number | string): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value < expected

        if (!result) {
            logError(`Expected ${value} to be less than to ${expected}.`)
        }

        return result
    },
    toBeLessThanOrEqual: (expected: number | string): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value <= expected

        if (!result) {
            logError(`Expected ${value} to be less than or equal to ${expected}.`)
        }

        return result
    },
    toBeAscSortedBy: (field: string): boolean => {
        if (value === undefined || value === null || !Array.isArray(value)) {
            logError(`Expected array to be sorted in descending order by '${field}' field, but passed value is not an array.`)

            return false
        }

        if (Array.isArray(value) && value.length === 0) {
            logError(`Expected array to be sorted in descending order by '${field}' field, but array is empty.`)

            return false
        }

        const result =
            typeof value[0][field] === 'number'
                ? value.every((record, index) => index === 0 || value[index - 1][field] - record[field] <= 0)
                : value.every((record, index) => index === 0 || value[index - 1][field].localeCompare(record[field]) <= 0)

        if (!result) {
            logError(`Expected array to be sorted in ascending order by '${field}' field.`)
        }

        return result
    },
    toBeDescSortedBy: (field: string): boolean => {
        if (value === undefined || value === null || !Array.isArray(value)) {
            logError(`Expected array to be sorted in descending order by '${field}' field, but passed value is not an array.`)

            return false
        }

        if (Array.isArray(value) && value.length === 0) {
            logError(`Expected array to be sorted in descending order by '${field}' field, but array is empty.`)

            return false
        }

        const result =
            typeof value[0][field] === 'number'
                ? value.every((record, index) => index === 0 || value[index - 1][field] - record[field] >= 0)
                : value.every((record, index) => index === 0 || value[index - 1][field].localeCompare(record[field]) >= 0)

        if (!result) {
            logError(`Expected array to be sorted in descending order by '${field}' field.`)
        }

        return result
    },
})
