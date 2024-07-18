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
import { DishCompatibilityService } from '../services/dish-compatibility.service';
import { Preferences } from '../../modules/shared/domain/entities';

@Controller('dish-compatibility')
export class DishCompatibilityController {
  constructor(
    private readonly dishCompatibilityService: DishCompatibilityService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 250 * 1024 },
    }),
  )
  async search(
    @UploadedFile() image: Express.Multer.File,
    @Body() preferences: Preferences,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const imageBuffer = image.buffer;
      const dish = await this.dishCompatibilityService.search(
        imageBuffer,
        preferences,
      );

      res.status(HttpStatus.OK).send(dish);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
