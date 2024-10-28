import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';

@Injectable()
export class CoffeeShopService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoffeeShop({
    createCoffeeShopDto,
  }: {
    createCoffeeShopDto: CreateCoffeeShopDto;
  }) {
    const {
      latitude,
      longitude,
      name,
      address,
      cost,
      urlImage,
      product
    } = createCoffeeShopDto;

    return await this.prisma.coffeeShop.create({
      data: {
        latitude,
        longitude,
        name,
        address,
        cost,
        urlImage,
        product
      },
    });
  }

  findAllCoffeeShop() {
    return this.prisma.coffeeShop.findMany();
  }

  findCoffeeShopById(id: string) {}

  updateCoffeeShop(id: string, coffeeShop: any) {}

  removeCoffeeShop(id: string) {}
}
