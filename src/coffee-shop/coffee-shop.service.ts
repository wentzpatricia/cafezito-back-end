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

  findCoffeeShopById(id: string) {
    return this.prisma.coffeeShop.findUnique({
      where: { id },
    });
  }

  async updateCoffeeShop(id: string, coffeeShop: any) {
    
    return this.prisma.coffeeShop.update({
      where: { id },
      data: {
        latitude: coffeeShop.latitude,
        longitude: coffeeShop.longitude,
        address: coffeeShop.address,
        cost: coffeeShop.cost,
        urlImage: coffeeShop.urlImage,
        product: coffeeShop.product,
      },
    });
  }

  async removeCoffeeShop(id: string) {
    return this.prisma.coffeeShop.delete({
      where: { id },
    });
  }
  
}
