/**
 * List of all tested modules in the app.
 */
export const MODULES = ['movies']

/**
 * Configuration values used in regression testing.
 */
export const virtualUsersNumber = parseInt(__ENV.VIRTUAL_USERS_NUMBER, 10)
export const iterations = parseInt(__ENV.ITERATIONS, 10)

/**
 * Configuration values used in performance testing.
 */
export const runPerformanceTest = __ENV.RUN_PERFORMANCE_TEST === 'true'
export const performanceTestStrategy = __ENV.PERFORMANCE_TEST_STRATEGY
export const performanceTestTime = parseInt(__ENV.PERFORMANCE_TEST_TIME_IN_M, 10)
export const targetIterationOrVUs = parseInt(__ENV.TARGET_ITERATIONS_OR_VUS, 10)
