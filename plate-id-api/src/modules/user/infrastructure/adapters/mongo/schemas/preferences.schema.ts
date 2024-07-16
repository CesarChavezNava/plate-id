import mongoose from 'mongoose';

export const PreferencesSchema = new mongoose.Schema({
  favoriteIngredients: [String],
  dislikedIngredients: [String],
  dietaryRestrictions: [String],
});
