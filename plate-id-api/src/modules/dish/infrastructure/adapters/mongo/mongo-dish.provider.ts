import { Connection } from 'mongoose';
import { DishSchema } from './schemas/dish.schema';

export const MongoDishProviders = [
  {
    provide: 'DISH_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Dish', DishSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
