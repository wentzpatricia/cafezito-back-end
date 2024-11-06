import { AppController } from './app.controller';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CoffeeShopModule } from './coffee-shop/coffee-shop.module';
import { CoffeeShopEnvironmentModule } from './coffee-shop-environment/coffee-shop-environment.module';
import { CofeeShopRatingModule } from './coffee-shop-rating/cofee-shop-rating.module';
import { CoffeeShopVouchersModule } from './coffee-shop-vouchers/coffee-shop-vouchers.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CoffeeShopModule,
    CoffeeShopEnvironmentModule,
    CofeeShopRatingModule,
    CoffeeShopVouchersModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
