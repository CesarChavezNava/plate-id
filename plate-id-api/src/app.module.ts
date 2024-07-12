import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DishModule } from './modules/dish/dish.module';

@Module({
  imports: [DishModule],
  controllers: [AppController],
})
export class AppModule {}
