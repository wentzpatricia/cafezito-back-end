import { Module } from '@nestjs/common';
import { CoffeeShopController } from './coffee-shop.controller';
import { CoffeeShopService } from './coffee-shop.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [CoffeeShopController],
  providers: [CoffeeShopService, PrismaService],
  exports: [CoffeeShopService],
})
export class CoffeeShopModule {}
