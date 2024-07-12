import { Document } from 'mongoose';

export interface IngredientModel extends Document {
  readonly name: string;
  readonly quantity?: string;
}

export interface StepModel extends Document {
  readonly index: number;
  readonly description: string;
}

export interface RecipeModel extends Document {
  readonly ingredients: IngredientModel[];
  readonly instructions: StepModel[];
}
