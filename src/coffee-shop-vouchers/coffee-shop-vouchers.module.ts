import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

import { CoffeeShopVoucherService } from './coffee-shop-vouchers.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { CoffeeShopVoucherController } from './coffee-shop-vouchers.controller';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [CoffeeShopVoucherController],
  providers: [CoffeeShopVoucherService, PrismaService],
  exports: [CoffeeShopVoucherService],
})
export class CoffeeShopVouchersModule {}
