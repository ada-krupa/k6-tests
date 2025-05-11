import http from 'k6/http'
import exec from 'k6/execution'
import { check, sleep } from 'k6'
import { MODULES } from '../constants.ts'
import { HttpMethods, RestApiRequestParams, TextRefinedResponse } from '../types.ts'

const validateParameters = (moduleName?: string) => {
    if (moduleName && moduleName !== '' && !MODULES.includes(moduleName)) {
        throw new Error('Invalid module name')
    }
}

export const createScenarioKey = (moduleName: string) => {
    validateParameters(moduleName)

    if (moduleName === '' || !moduleName) {
        return 'all-tests'
    }

    return moduleName
}

export const extractGroup = () => {
    const group = exec.vu.metrics.tags.group
    const groupName = group.toString().split('::').at(2)

    return groupName ?? exec.vu.metrics.tags.scenario
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const test = (name: string, callback: (name: string) => any) => {
    const useInfoLogs = __ENV.USE_INFO_LOGS

    if (useInfoLogs === 'true') {
        console.log(`Executing ${extractGroup()} - '${name}'`)
    }

    const result = callback(name)
    sleep(0.5)

    return result
}

const executeRequest = (requestParams: RestApiRequestParams) => {
    const { method, url, payload, requestOptions } = requestParams

    switch (method) {
        case HttpMethods.GET:
            return http.get(url, requestOptions)
        case HttpMethods.POST:
            return http.post(url, payload, requestOptions)
        case HttpMethods.PUT:
            return http.put(url, payload, requestOptions)
        case HttpMethods.PATCH:
            return http.patch(url, payload, requestOptions)
        case HttpMethods.DELETE:
            return http.del(url, payload, requestOptions)
        default:
            throw new Error(`Unsupported HTTP method: ${method}`)
    }
}

export const executeAndParseRequest = <T>(requestParams: RestApiRequestParams): T => {
    const { checkErrors = true, testName } = requestParams

    const response: TextRefinedResponse = executeRequest(requestParams)

    const parsedResponse = JSON.parse(response.body) as T

    // note: set checkErrors to false if you want to handle errors in the test itself
    if (checkErrors && response.status >= 400) {
        check(response, {
            [testName]: () => response.status <= 400,
        })

        console.error(response.body)

        return parsedResponse
    }

    return parsedResponse as T
}

// note: works only for array and primitive types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryParamsFromObject = (object: Record<string, any>): string =>
    Object.entries(object).reduce((acc, [key, value]) => {
        const paramValue = Array.isArray(value)
            ? value.reduce((innerAcc, currentValue) => (innerAcc === '' ? `${currentValue}` : `${innerAcc}&${key}=${currentValue}`), '')
            : value

        return acc === '' ? `${key}=${paramValue}` : `${acc}&${key}=${paramValue}`
    }, '')
