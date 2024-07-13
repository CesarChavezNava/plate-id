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
import { SearchDishCompatibilityDto } from '../dtos';
import { DishCompatibilityService } from '../services/dish-compatibility.serviice';

@Controller('dish-compatibility')
export class DishCompatibilityController {
  constructor(
    private readonly dishCompatibilityService: DishCompatibilityService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async search(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: SearchDishCompatibilityDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const imageBuffer = image.buffer;
      const dish = await this.dishCompatibilityService.search(imageBuffer);

      res.status(HttpStatus.OK).send(dish);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }
}
