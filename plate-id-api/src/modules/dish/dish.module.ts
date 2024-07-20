import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database.module';
import {
  DishAdapterProviders,
  MongoDishProviders,
} from './infrastructure/adapters';
import { DishUseCasesProviders } from './application';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...MongoDishProviders,
    ...DishAdapterProviders,
    ...DishUseCasesProviders,
  ],
  exports: [...DishUseCasesProviders],
})
export class DishModule {}
