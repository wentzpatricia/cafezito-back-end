import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeShopDto } from './dto/create-coffe-shop.dto';

@Injectable()
export class CoffeShopService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoffeShop({
    createCoffeShopDto,
  }: {
    createCoffeShopDto: CreateCoffeShopDto;
  }) {
    const {
      latitude,
      longitude,
      name,
      address,
      environment,
      cost,
      coffees,
      rating,
    } = createCoffeShopDto;

    return await this.prisma.coffeShop.create({
      data: {
        latitude,
        longitude,
        name,
        address,
        environment,
        cost,
        coffees,
        rating,
      },
    });
  }

  findAllCoffeShop() {}

  findCoffeShopById(id: string) {}

  updateCoffeShop(id: string, coffeShop: any) {}

  removeCoffeShop(id: string) {}
}
