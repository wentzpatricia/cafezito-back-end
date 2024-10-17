import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeShopService {
  constructor(private readonly prisma: PrismaService) {}

  createCoffeShop(coffeShop: any) {}

  findAllCoffeShop() {}

  findCoffeShopById(id: string) {}

  updateCoffeShop(id: string, coffeShop: any) {}

  removeCoffeShop(id: string) {}
}
