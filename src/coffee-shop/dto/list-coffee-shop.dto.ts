import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Rating, ProductTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ListCoffeeShopDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  rating: Rating;

  @IsString()
  urlImage: string;

  @IsArray()
  @IsEnum(ProductTag)
  @ApiProperty({ example: [ProductTag.VEGANO, ProductTag.WIFI], isArray: true })
  product: ProductTag[];
}
