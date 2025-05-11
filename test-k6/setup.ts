import http, { Response } from 'k6/http'
import { check } from 'k6'
import { Scenario, Options } from 'k6/options'
import { SetUpParameters, PerformanceTestStrategy, TestType } from './types.ts'
import { createScenarioKey, logError } from './utils/index.ts'
import { performanceTestStrategy, runPerformanceTest } from './constants.ts'
import {
    createIterationsBasedPerformanceTestScenario,
    createRegressionTestScenario,
    createVUsBasedPerformanceTestScenario,
} from './test-scenarios.ts'
import { movies } from './movies/index.ts'

const scenarioKey = createScenarioKey(__ENV.QUERY)

export const executeMoviesTests = (data: SetUpParameters) => movies(data.requestUrl)

export const createTestScenarios = (testType: TestType) => ({
    movies: testType('executeMoviesTests'),
})

export const SCENARIOS: Record<string, Scenario> = runPerformanceTest
    ? {
          ...(performanceTestStrategy === PerformanceTestStrategy.BY_VIRTUAL_USERS && {
              ...createTestScenarios(createVUsBasedPerformanceTestScenario),
          }),
          ...(performanceTestStrategy === PerformanceTestStrategy.BY_ITERATIONS && {
              ...createTestScenarios(createIterationsBasedPerformanceTestScenario),
          }),
      }
    : createTestScenarios(createRegressionTestScenario)

// moved to a separate function to identify better which scenario is failing in the summary report
const createThresholdsForEachScenario = () =>
    Object.fromEntries(
        Object.keys(SCENARIOS).flatMap(scenario => [
            [
                `checks{scenario:${scenario}}`,
                [
                    {
                        threshold: 'rate==1.00',
                    },
                ],
            ],
            [`http_req_duration{scenario:${scenario}}`, ['avg<2000']],
        ]),
    )

export const options: Options = {
    thresholds: {
        'checks{scenario:healthcheck}': [
            {
                threshold: 'rate==1.00',
                abortOnFail: true, // note: if healthcheck fails, do not run other tests
            },
        ],
        ...createThresholdsForEachScenario(),
    },
    scenarios: {
        healthcheck: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
            exec: 'default',
        },
        ...(scenarioKey === 'all-tests'
            ? SCENARIOS
            : {
                  [scenarioKey]: SCENARIOS[scenarioKey],
              }),
    },
}

export const setup = (): SetUpParameters => {
    const requestUrl = __ENV.REQUEST_API_URL
    const module = __ENV.MODULE

    return {
        requestUrl,
        module,
    }
}

export default (data: SetUpParameters) => {
    const { requestUrl } = data
    const response = http.get(`${requestUrl}/healthcheck`)

    check(response, {
        ['HealthCheck - response is status 200']: (result: Response) => {
            const success = result.status === 200

            if (!success) {
                logError(`\nResponse contains incorrect status ${result.status}`)
            }

            return success
        },
    })
}
