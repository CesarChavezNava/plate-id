import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { BaseError } from '../../modules/shared/domain/entities';

@Injectable()
export class UserValidateMiddleware implements NestMiddleware<any, any> {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.headers['x-plateid-userid']) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const userId = req.headers['x-plateid-userid'];
    if (!userId) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    try {
      const user = await this.userService.find(userId.toString());
      req.body = user.preferences;
      next();
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.code).send({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: error.message });
      }
    }
  }
}
