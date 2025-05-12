import { Scenario, Stage } from 'k6/options'
import { iterations, performanceTestTime, targetIterationOrVUs, virtualUsersNumber } from './constants.ts'

/**
 * Executor: 'per-vu-iterations' - run N iterations for each virtual user (VU).
 * @see https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/per-vu-iterations/
 */
export const createRegressionTestScenario = (exec: string): Scenario => ({
    executor: 'per-vu-iterations',
    vus: virtualUsersNumber,
    iterations,
    exec,
    startTime: '2s',
})

/**
 * Executor: 'ramping-vus' - variable number of VUs executes as many iterations as possible for a specified amount of time.
 * @see https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ramping-vus/
 */
export const createVUsBasedPerformanceTestScenario = (exec: string): Scenario => ({
    executor: 'ramping-vus',
    startVUs: 50,
    exec,
    stages: getPerformanceTestsStages(),
})

/**
 * Executor: 'ramping-arrival-rate' - gradually increases the number of requests sent to the system over time.
 * Unlike the ramping VUs executor, it can change the speed of the tests based on how many VUs are available.
 * @see https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ramping-arrival-rate/
 */
export const createIterationsBasedPerformanceTestScenario = (exec: string): Scenario => ({
    executor: 'ramping-arrival-rate',
    exec,
    /*
        Important note:
        The preAllocatedVUs should be high enough to handle the number of iterations per second you want to achieve in the stages.
        If your test report contains 'dropped iterations' metric, increase this value, 
        because it means that k6 was not able to handle the load you wanted to test.
    */
    preAllocatedVUs: 300,
    timeUnit: '1s',
    startRate: 5,
    stages: getPerformanceTestsStages(),
})

/**
 * The initial ramp-up takes 15% of the total time, ramping up linearly from 0 to 80% of the target value.
 * Then, there is an instant load increase, followed by the test staying at the target value for 70% of the total time.
 * Finally, the ramp-down takes 15% of the total time.
 * More informations here:
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/load-testing/#considerations
 * @see https://grafana.com/docs/k6/latest/examples/instant-load-increase/
 */
const getPerformanceTestsStages = (): Array<Stage> => [
    {
        target: Math.round(0.8 * targetIterationOrVUs),
        duration: `${0.15 * performanceTestTime}m`,
    },
    {
        target: targetIterationOrVUs,
        duration: '0',
    },
    {
        target: targetIterationOrVUs,
        duration: `${0.7 * performanceTestTime}m`,
    },
    {
        target: 0,
        duration: `${0.15 * performanceTestTime}m`,
    },
]
