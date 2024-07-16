import { Preferences } from './preferences';

export class User {
  constructor(
    public readonly email: string,
    public readonly preferences: Preferences,
  ) {}
}
