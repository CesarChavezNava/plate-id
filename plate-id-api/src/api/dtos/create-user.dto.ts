import { Preferences } from '../../modules/shared/domain/entities';

export class CreateUserDto {
  email: string;
  preferences: Preferences;
}
