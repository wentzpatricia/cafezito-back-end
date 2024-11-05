import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CoffeTypes, Environment, ProductTag } from '@prisma/client';

export class ListCoffeeShopByIdDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  environment: Environment;

  @IsString()
  address: string;

  @IsString()
  openingHours: string;

  @IsEnum(CoffeTypes)
  coffeTypes: CoffeTypes[];

  @IsEnum(ProductTag)
  product: ProductTag[];

  @IsOptional()
  socialMedias?: {
    name: string;
    url: string;
  }[];

  @IsArray()
  urlImages: string[];
}
