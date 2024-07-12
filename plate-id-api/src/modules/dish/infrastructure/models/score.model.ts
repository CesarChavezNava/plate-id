import { Document } from 'mongoose';

export interface ScoreModel extends Document {
  readonly name: string;
  readonly value: number;
}
