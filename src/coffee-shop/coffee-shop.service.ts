import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { Injectable } from '@nestjs/common';
import { ProductTag } from '@prisma/client';
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

  async findAllCoffeeShop(tags?: ProductTag | ProductTag[]) {
    const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : [];

    const filter =
      tagsArray.length > 0 ? { product: { hasSome: tagsArray } } : {};

    const coffeeShops = await this.prisma.coffeeShop.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        address: true,
        rating: true,
        urlImage: true,
        product: true,
      },
    });

    const coffeeShopsWithRatings = await Promise.all(
      coffeeShops.map(async (shop) => {
        const averageRating = await this.prisma.rating.aggregate({
          where: { coffeeShopId: shop.id },
          _avg: {
            stars: true,
          },
        });

        return {
          ...shop,
          averageRating: averageRating._avg.stars || 0,
        };
      }),
    );

    return coffeeShopsWithRatings;
  }

  async findCoffeeShopById(id: string) {
    const coffeeShop = await this.prisma.coffeeShop.findUnique({
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
        voucherPromotional: {
          select: {
            id: true,
            voucher: true,
            redeemed: true,
            availableQuantity: true,
            validFrom: true,
            validUntil: true,
            redeemedAt: true,
            redemptionCode: true,
            coffeeShopId: true,
            userId: true,
          },
        },
      },
    });

    const averageRating = await this.prisma.rating.aggregate({
      where: { coffeeShopId: id },
      _avg: {
        stars: true,
      },
    });

    return {
      ...coffeeShop,
      averageRating: averageRating._avg.stars,
    };
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
