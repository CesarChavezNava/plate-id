import { Inject, Injectable } from '@nestjs/common';
import {
  ForRecognizingDish,
  ForFindingDish,
  ForCreatingDish,
  ForFindingDishDetails,
} from '../../modules/dish/application';
import { ForCalculatingCompatibility } from '../../modules/compatibility/application';
import { Dish } from '../../modules/dish/domain/entities';
import { Preferences } from '../../modules/shared/domain/entities';

@Injectable()
export class CompatibilityService {
  constructor(
    @Inject('ForRecognizingDish')
    private readonly dishRecognizer: ForRecognizingDish,
    @Inject('ForFindingDish')
    private readonly dishFinder: ForFindingDish,
    @Inject('ForCreatingDish')
    private readonly dishCreator: ForCreatingDish,
    @Inject('ForFindingDishDetails')
    private readonly dishDetailsFinder: ForFindingDishDetails,
    @Inject('ForCalculatingCompatibility')
    private readonly compatibilityCalculator: ForCalculatingCompatibility,
  ) {}

  async calculateCompatibilityWithDish(
    dishImage: Buffer,
    preferences: Preferences,
  ): Promise<Dish> {
    const dishName = await this.dishRecognizer.execute(dishImage);
    let dish = await this.dishFinder.execute(dishName);

    const scoreCompatibility = await this.compatibilityCalculator.execute(
      dishName,
      preferences,
    );

    if (dish) {
      dish.scores.push(scoreCompatibility);
      return dish;
    }

    dish = await this.dishDetailsFinder.execute(dishName);
    await this.dishCreator.execute(dish);

    dish.scores.push(scoreCompatibility);
    return dish;
  }
}
