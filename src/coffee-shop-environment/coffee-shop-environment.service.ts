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
    const { description, urlImages, openingHours, coffeTypes, socialMedias } =
      createEnvironmentDto;
  
    const environment = await this.prisma.environment.create({
      data: {
        description,
        urlImages,
        openingHours,
        coffeTypes,
        coffeeShopId,
      },
    });

    if (socialMedias && socialMedias.length > 0) {
      const socialMediaPromises = socialMedias.map((socialMedia) =>
        this.prisma.socialMedias.create({
          data: {
            name: socialMedia.name,
            url: socialMedia.url,
            coffeeShopId,
            environmentId: environment.id,
          },
        }),
      );
      await Promise.all(socialMediaPromises);
    }
  
    return environment;
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
