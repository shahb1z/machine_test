import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';

@Module({
    imports: [
      ConfigModule.forRoot({
        load: [
          () => ({
            databaseUrl: 'mongodb://localhost:27017/myTest',
            port: 3000,
          }),
        ],
        isGlobal: true, // Make configuration globally available
      }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService], 
  })
export class ConfigurationModule {}
