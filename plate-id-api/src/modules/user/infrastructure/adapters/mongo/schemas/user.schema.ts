import * as mongoose from 'mongoose';
import { PreferencesSchema } from './preferences.schema';

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: String,
  preferences: PreferencesSchema,
});
