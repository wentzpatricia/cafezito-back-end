import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeShopRatingDto } from './dto/create-coffeee-shop-rating.dto';

@Injectable()
export class CoffeeShopRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async createRating(
    createRatingDto: CreateCoffeeShopRatingDto,
    coffeeShopId: string,
    userId: string,
  ) {
    const { stars, feedback } = createRatingDto;

    return this.prisma.rating.create({
      data: {
        stars,
        feedback,
        userId,
        coffeeShopId,
      },
    });
  }

  async updateRating(id: string, updateRatingDto: any, coffeeShopId: string) {
    const existingRating = await this.prisma.rating.findUnique({
      where: { id, coffeeShopId },
    });

    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    return this.prisma.rating.update({
      where: { id, coffeeShopId },
      data: updateRatingDto,
    });
  }

  async removeRating(id: string, coffeeShopId: string) {
    const existingRating = await this.prisma.rating.findUnique({
      where: { id, coffeeShopId },
    });

    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    return this.prisma.rating.delete({
      where: { id, coffeeShopId },
    });
  }
}
