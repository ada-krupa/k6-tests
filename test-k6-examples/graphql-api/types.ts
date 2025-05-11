import { RefinedResponse } from 'k6/http'

export type Country = {
    code: string
    name: string
    capital: string
    currency: string
}

export type GetCountriesInput = {
    name: string
}

export type TextRefinedResponse = RefinedResponse<'text'>

export type GraphqlResponse<K extends string, T> = {
    data: {
        [P in K]: T
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: Array<any>
}
