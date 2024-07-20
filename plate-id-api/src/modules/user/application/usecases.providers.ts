import { UserCreator } from './create-user.usecase';
import { UserFinder } from './find-user.usecase';
import { UserPreferencesUpdater } from './update-user-preferences.usecase';

export const UserUseCasesProviders = [
  {
    provide: 'ForCreatingUser',
    useClass: UserCreator,
  },
  {
    provide: 'ForFindingUser',
    useClass: UserFinder,
  },
  {
    provide: 'ForUpdatingUserPreferences',
    useClass: UserPreferencesUpdater,
  },
];
