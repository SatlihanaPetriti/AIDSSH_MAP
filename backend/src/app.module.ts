import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/Entity/user.entity';
import { CitiesModule } from './cities/cities.module';
import { CityEntity } from './cities/Entity/city.entity';
import { SitesModule } from './sites/sites.module';
import { SiteEntity } from './sites/Entity/site.entity';
import { ExecutionSitesModule } from './execution-sites/execution-sites.module';
import { ExecutionSiteEntity } from './execution-sites/Entity/execution-site.entity';
import { ErasModule } from './eras/eras.module';
import { EraEntity } from './eras/Entity/era.entity';
import { AuthMiddleware } from './Middleware/auth.middleware';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [UserEntity, CityEntity, SiteEntity, ExecutionSiteEntity, EraEntity],
                synchronize: true,
            }),
        }),
        AuthModule,
        UsersModule,
        CitiesModule,
        SitesModule,
        ExecutionSitesModule,
        ErasModule,

    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'auth/checkUser', method: RequestMethod.GET },
                { path: 'auth/logout', method: RequestMethod.POST },
                { path: 'users', method: RequestMethod.ALL },
                { path: 'users/*path', method: RequestMethod.ALL },
                { path: 'cities', method: RequestMethod.POST },
                { path: 'cities/*path', method: RequestMethod.PUT },
                { path: 'cities/*path', method: RequestMethod.DELETE },
                { path: 'sites', method: RequestMethod.POST },
                { path: 'sites/*path', method: RequestMethod.PUT },
                { path: 'sites/*path', method: RequestMethod.DELETE },
                { path: 'execution-sites', method: RequestMethod.POST },
                { path: 'execution-sites/*path', method: RequestMethod.PUT },
                { path: 'execution-sites/*path', method: RequestMethod.DELETE },
                { path: 'eras', method: RequestMethod.POST },
                { path: 'eras/*path', method: RequestMethod.PUT },
                { path: 'eras/*path', method: RequestMethod.DELETE },
            );
    }
}
