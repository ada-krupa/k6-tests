import { RefinedParams, RefinedResponse } from 'k6/http'

type Dough = {
    ID: number
    name: string
    caloriesPerSlice: number
}
export type DoughsResponse = {
    doughs: Array<Dough>
}

export type TextRefinedResponse = RefinedResponse<'text'>
