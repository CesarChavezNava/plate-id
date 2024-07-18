import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DishModule } from 'src/modules/dish/dish.module';
import { UserModule } from 'src/modules/user/user.module';
import { DishCompatibilityController } from './controllers/dish-compatibility.controller';
import { DishCompatibilityService } from './services/dish-compatibility.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserValidateMiddleware } from './middlewares/user-validate.middleware';
import { DishCompatibilityModule } from 'src/modules/dish-compatibility/dish-compatibility.module';

@Module({
  imports: [DishCompatibilityModule, DishModule, UserModule],
  providers: [DishCompatibilityService, UserService, UserValidateMiddleware],
  controllers: [DishCompatibilityController, UserController],
})
export class ApiModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    consumer.apply(UserValidateMiddleware).forRoutes({
      path: 'dish-compatibility',
      method: RequestMethod.ALL,
    });
  }
}
