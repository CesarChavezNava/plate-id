import { Injectable } from '@nestjs/common';
import {
  Dish,
  Ingredient,
  Recipe,
  Score,
  Step,
} from '../../../domain/entities';
import { DishType } from './dish-ia.schemas';

@Injectable()
export class DishIAMapper {
  toDish(name: string, from: DishType): Dish {
    const ingredients = from.recipe.ingredients.map(
      (ingredient) => new Ingredient(ingredient.name, ingredient.quantity),
    );

    const steps = from.recipe.instructions.map(
      (step) => new Step(step.index, step.description),
    );

    const scores = from.scores.map(
      (score) => new Score(score.name, score.value, score.description),
    );

    return new Dish(name, from.origin, new Recipe(ingredients, steps), scores);
  }
}
