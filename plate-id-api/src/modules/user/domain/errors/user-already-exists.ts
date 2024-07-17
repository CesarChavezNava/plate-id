import { BaseError } from '../../../shared/domain/entities';

export class UserAlreadyExists extends BaseError {
  constructor(email: string) {
    super(`The user '${email}' already exists.`, 400);
  }
}
