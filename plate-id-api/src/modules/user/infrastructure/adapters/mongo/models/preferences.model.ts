import { Document } from 'mongoose';

export interface PreferencesModel extends Document {
  readonly favoriteIngredients: string[];
  readonly dislikedIngredients: string[];
  readonly dietaryRestrictions: string[];
}
