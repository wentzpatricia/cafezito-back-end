import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CoffeShopModule } from './coffe-shop/coffe-shop.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CoffeShopModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
