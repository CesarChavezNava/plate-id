import { Injectable } from '@nestjs/common';
import { ScoreType } from './ai.schemas';
import { Score } from '../../domain/entities';

@Injectable()
export class AIMapper {
  toScore(from: ScoreType): Score {
    return new Score(from.name, from.value, from.description);
  }
}
