import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database.module';
import { DishMongoRepository } from './infrastructure/adapters/mongo/dish-mongo.repository';
import { DishProviders } from './infrastructure/adapters/mongo/dish.provider';
import { DishIAAdapter, DishIAMapper } from './infrastructure/adapters';
import {
  CreateDish,
  FindDish,
  GetDishDetails,
  RecognizeDish,
} from './application';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...DishProviders,
    {
      provide: 'DishRepository',
      useClass: DishMongoRepository,
    },
    {
      provide: 'DishIAPort',
      useClass: DishIAAdapter,
    },
    CreateDish,
    FindDish,
    RecognizeDish,
    GetDishDetails,
    DishIAMapper,
  ],
  exports: [CreateDish, FindDish, RecognizeDish, GetDishDetails],
})
export class DishModule {}
