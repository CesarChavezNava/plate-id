import { Score } from '../../../shared/domain/entities';
import { Preferences } from '../entities';

export interface UserPreferencesIAPort {
  calculateCompatibility(
    dishName: string,
    user: Preferences,
  ): Promise<Score>;
}
