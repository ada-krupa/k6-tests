import { EnvironmentVariables } from './environment.variables'
import { toBoolean } from './utils'

export const swaggerConfig = (configEnvs: EnvironmentVariables) => ({
    login: configEnvs.SWAGGER_LOGIN,
    password: configEnvs.SWAGGER_PASSWORD,
    route: configEnvs.SWAGGER_ROUTE,
    useSwagger: toBoolean(configEnvs.USE_SWAGGER),
})
