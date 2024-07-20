import { Document } from 'mongoose';
import { RecipeModel } from './recipe.model';
import { ScoreModel } from './score.model';

export interface DishModel extends Document {
  readonly name: string;
  readonly origin: string;
  readonly recipe: RecipeModel;
  readonly scores: ScoreModel[];
}
