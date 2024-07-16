import { Document } from 'mongoose';
import { PreferencesModel } from './preferences.model';

export interface UserModel extends Document {
  readonly email: string;
  readonly preferences: PreferencesModel;
}
