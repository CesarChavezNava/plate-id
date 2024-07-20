import mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  ingredients: [String],
  instructions: [String],
});
