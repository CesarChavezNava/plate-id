import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DishModule } from '../modules/dish/dish.module';
import { UserModule } from '../modules/user/user.module';
import { CompatibilityModule } from '../modules/compatibility/compatibility.module';
import { CompatibilityService, UserService } from './services';
import { CompatibilityController, UserController } from './controllers';
import { UserValidateMiddleware } from './middlewares';

@Module({
  imports: [CompatibilityModule, DishModule, UserModule],
  providers: [CompatibilityService, UserService, UserValidateMiddleware],
  controllers: [CompatibilityController, UserController],
})
export class ApiModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    consumer.apply(UserValidateMiddleware).forRoutes({
      path: 'dish-compatibility',
      method: RequestMethod.ALL,
    });
  }
}
