import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const StepSchema = new mongoose.Schema({
  index: Number,
  description: String,
});

export const RecipeSchema = new mongoose.Schema({
  ingredients: [IngredientSchema],
  instructions: [StepSchema],
});
