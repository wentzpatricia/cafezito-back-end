import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeeShopService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoffeeShop({
    createCoffeeShopDto,
  }: {
    createCoffeeShopDto: CreateCoffeeShopDto;
  }) {
    const { latitude, longitude, name, address, cost, urlImage, product } =
      createCoffeeShopDto;

    return await this.prisma.coffeeShop.create({
      data: {
        latitude,
        longitude,
        name,
        address,
        cost,
        urlImage,
        product,
      },
    });
  }

  findAllCoffeeShop() {
    return this.prisma.coffeeShop.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        rating: true,
        urlImage: true,
        product: true,
      },
    });
  }

  findCoffeeShopById(id: string) {
    return this.prisma.coffeeShop.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        rating: true,
        product: true,
        environment: {
          select: {
            id: true,
            description: true,
            openingHours: true,
            coffeTypes: true,
            urlImages: true,
            socialMedias: {
              select: {
                name: true,
                url: true,
              },
            },
          },
        },
      },
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
