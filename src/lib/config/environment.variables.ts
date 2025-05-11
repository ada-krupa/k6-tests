import { IsBooleanString, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'
import { NodeEnv } from './constants'
import { toBoolean } from './utils'

export class EnvironmentVariables {
    @IsOptional()
    @IsEnum(NodeEnv)
    readonly NODE_ENV: NodeEnv = NodeEnv.Development

    @IsOptional()
    @IsNumber()
    readonly API_PORT: number = 3000

    @IsOptional()
    @IsString()
    readonly API_HOST: string = '0.0.0.0'

    @IsOptional()
    @IsString()
    readonly CORS_ALLOWED_ORIGINS: string = '*'

    // default 20 MB
    @IsOptional()
    @IsInt()
    readonly MAX_FILE_SIZE_KB: number = 20 * 1024 * 1024

    @IsOptional()
    @IsString()
    readonly SERVICE_VERSION: string = 'unknown'

    @IsOptional()
    @IsString()
    readonly SWAGGER_LOGIN: string

    @IsOptional()
    @IsString()
    readonly SWAGGER_PASSWORD: string

    @ValidateIf(value => toBoolean(value.USE_SWAGGER))
    @IsString()
    readonly SWAGGER_ROUTE: string = 'swagger'

    @IsOptional()
    @IsBooleanString()
    readonly USE_SWAGGER: string = 'false'
}
