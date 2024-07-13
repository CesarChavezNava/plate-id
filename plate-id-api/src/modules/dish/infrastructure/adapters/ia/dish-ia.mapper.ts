import { Injectable } from '@nestjs/common';
import { Score } from '../../../../shared/domain/entities';
import { Dish, Recipe } from '../../../domain/entities';
import { DishType } from './dish-ia.schemas';

@Injectable()
export class DishIAMapper {
  toDish(name: string, from: DishType): Dish {
    const scores = from.scores.map(
      (score) => new Score(score.name, score.value, score.description),
    );

    return new Dish(
      name,
      from.origin,
      new Recipe(from.recipe.ingredients, from.recipe.instructions),
      scores,
    );
  }
}
