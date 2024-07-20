import * as mongoose from 'mongoose';
import { RecipeSchema } from './recipe.schema';
import { ScoreSchema } from './score.schema';

export const DishSchema = new mongoose.Schema({
  name: String,
  origin: String,
  recipe: RecipeSchema,
  scores: [ScoreSchema],
});
