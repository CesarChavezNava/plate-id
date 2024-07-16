import * as mongoose from 'mongoose';
import { PreferencesSchema } from './preferences.schema';

export const UserSchema = new mongoose.Schema({
  email: String,
  preferences: PreferencesSchema,
});
