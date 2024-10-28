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
      urlImage
    } = createCoffeeShopDto;

    return await this.prisma.coffeeShop.create({
      data: {
        latitude,
        longitude,
        name,
        address,
        cost,
        urlImage
      },
    });
  }

  findAllCoffeShop() {}

  findCoffeShopById(id: string) {}

  updateCoffeShop(id: string, coffeeShop: any) {}

  removeCoffeShop(id: string) {}
}
