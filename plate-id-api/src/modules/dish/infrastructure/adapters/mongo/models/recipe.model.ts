import { Document } from 'mongoose';
export interface RecipeModel extends Document {
  readonly ingredients: string[];
  readonly instructions: string[];
}
