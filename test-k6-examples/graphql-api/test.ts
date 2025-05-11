import { check } from 'k6'
import http from 'k6/http'
import { getCountriesQuery } from './queries.ts'
import { TextRefinedResponse, Country, GraphqlResponse } from './types.ts'

export default () => {
    const url = 'https://countries.trevorblades.com/'

    const headers = {
        'Content-Type': 'application/json'
    }
    const requestOptions = {
        headers
    }

    const payload = JSON.stringify(
        getCountriesQuery({
            name: 'Singapore'
        })
    )

    const response: TextRefinedResponse = http.post(url, payload, requestOptions)

    check(response, {
        'status is 200': response => response.status === 200,
        'response time < 200ms': response => response.timings.duration < 200
    })

    const parsedResponse: GraphqlResponse<'countries', Array<Country>> = JSON.parse(response.body)
    const countries = parsedResponse.data.countries

    check(countries, {
        'response should not be an empty array': countries => countries.length !== 0,
        'name should be Singapore': countries => countries.every(country => country.name === 'Singapore')
    })
}
