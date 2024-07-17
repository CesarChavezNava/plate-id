import { BaseError } from '../../../shared/domain/entities';

export class UserNotFound extends BaseError {
  constructor(userId: string) {
    super(`The user '${userId}' not found.`, 404);
  }
}
