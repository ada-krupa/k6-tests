import { hasElements, hasKeys, isDefined, clearObject, all } from './ramda'

describe('ramda utils', () => {
    describe('hasElements', () => {
        it('should return false for value different than array', () => {
            const subject1 = false
            const subject2 = 12
            const subject3 = 'string'
            const subject4 = {}
            // eslint-disable-next-line no-empty-function
            const subject5 = () => {}

            expect(hasElements(subject1)).toBeFalsy()
            expect(hasElements(subject2)).toBeFalsy()
            expect(hasElements(subject3)).toBeFalsy()
            expect(hasElements(subject4)).toBeFalsy()
            expect(hasElements(subject5)).toBeFalsy()
        })

        it('should return false for empty array', () => {
            expect(hasElements([])).toBeFalsy()
        })

        it('should return true for array with at least one element', () => {
            expect(hasElements([1])).toBeTruthy()
            expect(hasElements([false, {}])).toBeTruthy()
            expect(hasElements(['a', 'b', 'c'])).toBeTruthy()
        })
    })

    describe('hasKeys', () => {
        it('should return false', () => {
            const arg1 = 1
            const arg2 = 'test'
            // @ts-expect-error - empty array is expected here
            const arg3 = []
            const arg4 = {}

            expect(hasKeys(arg1)).toBeFalsy()
            expect(hasKeys(arg2)).toBeFalsy()
            // @ts-expect-error - empty array is expected here
            expect(hasKeys(arg3)).toBeFalsy()
            expect(hasKeys(arg4)).toBeFalsy()
        })

        it('should return true', () => {
            const arg1 = {
                a: 1,
            }

            expect(hasKeys(arg1)).toBeTruthy()
        })
    })

    describe('isDefined', () => {
        it('should return true', () => {
            const arg1 = 1
            const arg2 = ''
            const arg3 = {}
            // @ts-expect-error - empty array is expected here
            const arg4 = []
            const arg5 = null

            expect(isDefined(arg1)).toBeTruthy()
            expect(isDefined(arg2)).toBeTruthy()
            expect(isDefined(arg3)).toBeTruthy()
            // @ts-expect-error - empty array is expected here
            expect(isDefined(arg4)).toBeTruthy()
            expect(isDefined(arg5)).toBeFalsy()
        })

        it('should return false', () => {
            const arg1 = undefined

            expect(isDefined(arg1)).toBeFalsy()
        })
    })

    describe('all', () => {
        it('should return true if every condition is correct', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            expect(all(true, Boolean(10), 10 === 10)).toEqual(true)
        })

        it('if one of the arguments is falsy', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            expect(all(false, Boolean(10), 10 === 10)).toEqual(false)
        })

        it('should return true if no arguments passed', () => {
            expect(all()).toEqual(true)
        })
    })

    describe('clearObject', () => {
        it('should return the same object', () => {
            const arg1 = {
                a: 1,
                b: 2,
                c: 3,
            }

            expect(clearObject(arg1)).toEqual(arg1)
        })

        it('should return object without undefined value', () => {
            const arg1 = {
                a: 1,
                b: 2,
                c: undefined,
            }
            const expectedValue = {
                a: 1,
                b: 2,
            }

            expect(clearObject(arg1)).toEqual(expectedValue)
        })

        it('should return object without null value', () => {
            const arg1 = {
                a: 1,
                b: 2,
                c: null,
            }
            const expectedValue = {
                a: 1,
                b: 2,
            }

            expect(clearObject(arg1)).toEqual(expectedValue)
        })

        it('should return empty object', () => {
            const arg1 = {}

            expect(clearObject(arg1)).toEqual(arg1)
        })

        it('should clear empty string', () => {
            const arg1 = {
                str1: '',
                str2: 'Test',
            }

            expect(clearObject(arg1)).toEqual({
                str2: 'Test',
            })
        })

        it('should not clear zeros', () => {
            const arg1 = {
                str1: 1,
                str2: 0,
            }

            expect(clearObject(arg1)).toEqual(arg1)
        })
    })
})
