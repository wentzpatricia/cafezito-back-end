import { CreateCoffeeShopEnvironmentDto } from './dto/create-coffee-shop-environment.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeeShopEnvironmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createEnvironment(
    createEnvironmentDto: CreateCoffeeShopEnvironmentDto,
    coffeeShopId: string,
  ) {
    const { description, urlImages, openingHours, coffeTypes } =
      createEnvironmentDto;

    return this.prisma.environment.create({
      data: {
        description,
        urlImages,
        openingHours,
        coffeTypes,
        coffeeShopId,
      },
    });
  }

  async updateEnvironment(
    id: string,
    updateEnvironmentDto: any,
    coffeeShopId: string,
  ) {
    return this.prisma.environment.update({
      where: { id, coffeeShopId },
      data: updateEnvironmentDto,
    });
  }

  async removeEnvironment(id: string, coffeeShopId: string) {
    return this.prisma.environment.delete({
      where: { id, coffeeShopId },
    });
  }
}
