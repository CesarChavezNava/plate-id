import mongoose from 'mongoose';

export const ScoreSchema = new mongoose.Schema({
  name: String,
  value: Number,
  description: String,
});
