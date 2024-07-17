import { Module } from '@nestjs/common';
import { DishModule } from 'src/modules/dish/dish.module';
import { UserModule } from 'src/modules/user/user.module';
import { DishCompatibilityController } from './controllers/dish-compatibility.controller';
import { DishCompatibilityService } from './services/dish-compatibility.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DishModule, UserModule],
  providers: [DishCompatibilityService, UserService],
  controllers: [DishCompatibilityController, UserController],
})
export class ApiModule {}
