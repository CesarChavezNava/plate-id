import { MongoDishRepository } from './mongo/mongo-dish.repository';
import { OpeniaDishAIService } from './ai/open-ia-dish-ia.service';
import { DishAIMapper } from './ai/dish-ai.mapper';

export const DishAdapterProviders = [
  {
    provide: 'DishRepository',
    useClass: MongoDishRepository,
  },
  {
    provide: 'DishAIService',
    useClass: OpeniaDishAIService,
  },
  DishAIMapper,
];
