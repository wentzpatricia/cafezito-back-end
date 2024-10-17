import { Module } from '@nestjs/common';
import { CoffeShopController } from './coffe-shop.controller';
import { CoffeShopService } from './coffe-shop.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [CoffeShopController],
  providers: [CoffeShopService, PrismaService],
  exports: [CoffeShopService],
})
export class CoffeShopModule {}
