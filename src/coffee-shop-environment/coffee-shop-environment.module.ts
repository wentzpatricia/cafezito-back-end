import { Module } from '@nestjs/common';

import { CoffeeShopEnvironmentController } from './coffee-shop-environment.controller';
import { CoffeeShopEnvironmentService } from './coffee-shop-environment.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [PrismaModule],
    controllers: [CoffeeShopEnvironmentController],
    providers: [CoffeeShopEnvironmentService, PrismaService],
    exports: [CoffeeShopEnvironmentService]
})
export class CoffeeShopEnvironmentModule {}
