import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envValidation } from 'lib/config'
import { MoviesModule } from 'modules/movies'
import { HealthCheckModule } from 'modules/health-check'
import { AppService } from './app.service'

@Module({
    imports: [
        HealthCheckModule,
        MoviesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envValidation,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
    ],
    providers: [AppService],
})
export class AppModule {}
