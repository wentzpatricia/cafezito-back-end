import { Module } from '@nestjs/common';

import { CoffeeShopRatingService } from './coffee-shop-rating.service';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoffeeShopRatingController } from './coffee-shop-rating.controller';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [CoffeeShopRatingController],
  providers: [CoffeeShopRatingService, PrismaService],
  exports: [CoffeeShopRatingService],
})
export class CofeeShopRatingModule {}
