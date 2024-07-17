import { Document, Types } from 'mongoose';
import { PreferencesModel } from './preferences.model';

export interface UserModel extends Document {
  readonly _id: Types.ObjectId;
  readonly email: string;
  readonly preferences: PreferencesModel;
}
