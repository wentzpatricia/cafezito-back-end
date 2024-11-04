import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CoffeeShopModule } from './coffee-shop/coffee-shop.module';
import { CoffeeShopEnvironmentModule } from './coffee-shop-environment/coffee-shop-environment.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CoffeeShopModule,
    CoffeeShopEnvironmentModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
