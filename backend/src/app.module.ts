import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/Entity/user.entity';
import { SitesModule } from './sites/sites.module';
import { SiteEntity } from './sites/Entity/site.entity';
import { ExecutionSitesModule } from './execution-sites/execution-sites.module';
import { ExecutionSiteEntity } from './execution-sites/Entity/execution-site.entity';
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
                entities: [UserEntity, SiteEntity, ExecutionSiteEntity],
                synchronize: true,
            }),
        }),
        AuthModule,
        UsersModule,
        SitesModule,
        ExecutionSitesModule,

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
                { path: 'sites', method: RequestMethod.POST },
                { path: 'sites/*path', method: RequestMethod.PUT },
                { path: 'sites/*path', method: RequestMethod.DELETE },
                { path: 'execution-sites', method: RequestMethod.POST },
                { path: 'execution-sites/*path', method: RequestMethod.PUT },
                { path: 'execution-sites/*path', method: RequestMethod.DELETE },
            );
    }
}
