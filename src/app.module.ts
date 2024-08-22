import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { UserModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './common/services/logger.service';
import { LoggingMiddleware } from './common/middleware/loggin.middleware';
import { HttpExceptionFilter } from './common/filters/exception.filter'; 

@Module({
  imports: [ItemsModule ,UserModule,MongooseModule.forRootAsync({
    imports: [ConfigurationModule], 
    inject: [AppConfigService],
    useFactory: async (configService: AppConfigService) => ({
      uri: configService.databaseUrl,
    }),
  }),],
  
  controllers: [AppController],
  providers: [AppService,    LoggerService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,  
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
    exports:[
      LoggerService
    ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); 
  }
}
