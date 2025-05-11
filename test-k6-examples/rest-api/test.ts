import http from 'k6/http'
import { check } from 'k6'
import { TextRefinedResponse, DoughsResponse } from './types.ts'

export default () => {
    const headers = {
        Authorization: 'Token abcdef0123456789',
    }
    const response: TextRefinedResponse = http.get('https://quickpizza.grafana.com/api/doughs', {
        headers,
    })

    check(response, {
        'status is 200': response => response.status === 200,
        'response time < 200ms': response => response.timings.duration < 200,
    })

    const parsedResponse: DoughsResponse = JSON.parse(response.body)

    check(parsedResponse, {
        'response should not be an empty array': parsedResponse => parsedResponse.doughs.length !== 0,
        'all doughs have ID, name, caloriesPerSlice': () =>
            parsedResponse.doughs.every(
                dough => Object.hasOwn(dough, 'ID') && Object.hasOwn(dough, 'name') && Object.hasOwn(dough, 'caloriesPerSlice'),
            ),
        'first dough has ID - 1': () => parsedResponse.doughs[0].ID === 1,
        'first dough has name - Thin': () => parsedResponse.doughs[0].name === 'Thin',
    })
}
