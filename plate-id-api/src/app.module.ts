import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      //ignoreEnvFile: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
