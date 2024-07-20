import { Inject, Injectable } from '@nestjs/common';
import { CompatibilityAIService } from '../domain/ports/compatibility-ia.service';
import { Preferences, Score } from '../../shared/domain/entities';

export interface ForCalculatingCompatibility {
  execute(dishName: string, preferences: Preferences): Promise<Score>;
}

@Injectable()
export class CompatibilityCalculator implements ForCalculatingCompatibility {
  constructor(
    @Inject('CompatibilityAIService')
    private readonly compatibilityAIService: CompatibilityAIService,
  ) {}

  async execute(dishName: string, preferences: Preferences): Promise<Score> {
    return await this.compatibilityAIService.calculate(dishName, preferences);
  }
}
