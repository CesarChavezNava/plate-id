import { Inject, Injectable } from '@nestjs/common';
import { DishCompatibilityIAPort } from '../domain/ports/dish-compatibility-ia.port';
import { Preferences, Score } from '../../shared/domain/entities';

@Injectable()
export class CalcCompatibility {
  constructor(
    @Inject('DishCompatibilityIAPort')
    private readonly dishCompatibilityIAPort: DishCompatibilityIAPort,
  ) {}

  async execute(name: string, preferences: Preferences): Promise<Score> {
    return await this.dishCompatibilityIAPort.calcCompatibility(
      name,
      preferences,
    );
  }
}
