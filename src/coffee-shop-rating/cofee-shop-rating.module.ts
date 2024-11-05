import { Module } from '@nestjs/common';

import { CoffeeShopRatingService } from './coffee-shop-rating.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeShopRatingDto } from './dto/create-coffeee-shop-rating.dto';

@Module({
    imports: [PrismaModule],
    controllers: [CreateCoffeeShopRatingDto],
    providers: [CoffeeShopRatingService, PrismaService],
    exports: [CoffeeShopRatingService],
})
export class CofeeShopRatingModule {}
