import { Injectable } from '@nestjs/common';
import { ScoreType } from './ia.schemas';
import { Score } from '../../domain/entities';

@Injectable()
export class IAMapper {
  toScore(from: ScoreType): Score {
    return new Score(from.name, from.value, from.description);
  }
}
