import { Preferences } from '../../modules/user/domain/entities';

export class CreateUserDto {
  email: string;
  preferences: Preferences;
}
