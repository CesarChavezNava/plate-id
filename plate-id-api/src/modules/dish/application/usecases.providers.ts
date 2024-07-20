import { DishCreator } from './create-dish.usecase';
import { DishDetailsFinder } from './find-dish-details.usecase';
import { DishFinder } from './find-dish.usecase';
import { DishRecognizer } from './recognize-dish.usecase';

export const DishUseCasesProviders = [
  {
    provide: 'ForCreatingDish',
    useClass: DishCreator,
  },
  {
    provide: 'ForFindingDish',
    useClass: DishFinder,
  },
  {
    provide: 'ForFindingDishDetails',
    useClass: DishDetailsFinder,
  },
  {
    provide: 'ForRecognizingDish',
    useClass: DishRecognizer,
  },
];
