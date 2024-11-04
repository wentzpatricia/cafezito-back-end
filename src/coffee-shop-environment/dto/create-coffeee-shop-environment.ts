import { IsString, IsArray, IsOptional, ArrayMaxSize, IsEnum } from 'class-validator';
import { CoffeTypes } from '@prisma/client';

export class CreateCoffeeShopEnvironmentDto {
  @IsString()
  description: string;

  @IsString()
  openingHours: string;

  @IsArray()
  @IsEnum(CoffeTypes, { each: true, message: 'Valor para tipo de café inválido' })
  coffeTypes: CoffeTypes[];

  @IsArray()
  @ArrayMaxSize(6, { message: 'O número máximo de imagens é 6.' })
  urlImages: string[];

  @IsArray()
  @IsOptional()
  socialMedias?: {
    name: string;
    url: string;
  }[];
}
