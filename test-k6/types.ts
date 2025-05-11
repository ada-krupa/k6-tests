import { RefinedParams, RefinedResponse } from 'k6/http'
import {
    createIterationsBasedPerformanceTestScenario,
    createRegressionTestScenario,
    createVUsBasedPerformanceTestScenario,
} from './test-scenarios.ts'

export type SetUpParameters = {
    requestUrl: string
    module: string
}

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}

export type RestApiRequestParams = {
    method: HttpMethods
    url: string
    payload?: string
    requestOptions: RequestOptions
    testName: string
    checkErrors?: boolean
}

export type TestType =
    | typeof createVUsBasedPerformanceTestScenario
    | typeof createIterationsBasedPerformanceTestScenario
    | typeof createRegressionTestScenario

export type GraphqlResponse<K extends string, T> = {
    data: {
        [P in K]: T
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: Array<any>
}

export type TextRefinedResponse = RefinedResponse<'text'>
export type RequestOptions = RefinedParams<'text'>

export type GraphqlRequestParams = {
    url: string
    payload: string
    requestOptions: RequestOptions
    testName: string
    checkErrors?: boolean
}

export enum PerformanceTestStrategy {
    BY_VIRTUAL_USERS = 'BY_VIRTUAL_USERS',
    BY_ITERATIONS = 'BY_ITERATIONS',
}
