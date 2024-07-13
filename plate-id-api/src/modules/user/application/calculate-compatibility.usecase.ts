import { Inject, Injectable } from '@nestjs/common';
import { UserPreferencesIAPort } from '../domain/port/user-preferences-ia.port';
import { UserPreferences } from '../domain/entities';
import { Score } from 'src/modules/shared/domain/entities';

@Injectable()
export class CalculateCompatibility {
  constructor(
    @Inject('UserPreferencesIAPort')
    private readonly userPreferencesIAPort: UserPreferencesIAPort,
  ) {}

  async execute(
    dishName: string,
    preferences: UserPreferences,
  ): Promise<Score> {
    return await this.userPreferencesIAPort.calculateCompatibility(
      dishName,
      preferences,
    );
  }
}
