import { Response } from 'express';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CompatibilityService } from '../services/compatibility.service';
import { BaseError, Preferences } from '../../modules/shared/domain/entities';

@Controller('dish-compatibility')
export class CompatibilityController {
  constructor(
    private readonly dishCompatibilityService: CompatibilityService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 250 * 1024 },
    }),
  )
  async calculateCompatibilityWithDish(
    @UploadedFile() image: Express.Multer.File,
    @Body() preferences: Preferences,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const imageBuffer = image.buffer;
      const dish =
        await this.dishCompatibilityService.calculateCompatibilityWithDish(
          imageBuffer,
          preferences,
        );

      res.status(HttpStatus.OK).send(dish);
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
