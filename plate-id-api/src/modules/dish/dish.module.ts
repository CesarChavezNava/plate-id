import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database.module';
import { DishMongoRepository } from './infrastructure/repositories/dish-mongo.repository';
import { DishService } from './infrastructure/services';
import { DishController } from './infrastructure/controllers';
import { DishProviders } from './infrastructure/providers/dish.provider';
import { ConfigModule } from '@nestjs/config';
import { DishIAAdapter, DishIAMapper } from './infrastructure/adapters';
import {
  CreateDish,
  FindDish,
  GetDishDetails,
  RecognizeDish,
} from './applicatiion';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
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
    DishService,
  ],
  controllers: [DishController],
})
export class DishModule {}
