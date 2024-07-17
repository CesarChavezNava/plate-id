import { Response } from 'express';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { BaseError } from '../../modules/shared/domain/entities';
import { UpdateUserDto } from '../dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const userId = await this.userService.create(dto);

      res.status(HttpStatus.CREATED).send({ userId: userId });
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

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.userService.update(userId, dto);

      res.status(HttpStatus.NO_CONTENT);
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
