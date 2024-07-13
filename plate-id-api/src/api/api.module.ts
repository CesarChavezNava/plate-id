import { Module } from '@nestjs/common';
import { DishModule } from 'src/modules/dish/dish.module';
import { UserModule } from 'src/modules/user/user.module';
import { DishCompatibilityController } from './controllers/dish-compatibility.controller';
import { DishCompatibilityService } from './services/dish-compatibility.serviice';

@Module({
  imports: [DishModule, UserModule],
  providers: [DishCompatibilityService],
  controllers: [DishCompatibilityController],
})
export class ApiModule {}
