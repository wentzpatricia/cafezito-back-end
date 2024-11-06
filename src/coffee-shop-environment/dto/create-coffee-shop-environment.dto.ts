import { ApiProperty } from '@nestjs/swagger';
import { CoffeTypes } from '@prisma/client';
import {
  IsString,
  IsArray,
  IsOptional,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';

export class CreateCoffeeShopEnvironmentDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  openingHours: string;

  @ApiProperty({
    enum: CoffeTypes,
    isArray: true,
  })
  @IsArray()
  @IsEnum(CoffeTypes, {
    each: true,
    message: 'Valor para tipo de café inválido',
  })
  coffeTypes: CoffeTypes[];

  @ApiProperty({
    type: String,
    isArray: true,
    maxItems: 6,
  })
  @IsArray()
  @ArrayMaxSize(6, { message: 'O número máximo de imagens é 6.' })
  urlImages: string[];

  @ApiProperty({
    type: Object,
    isArray: true,
    required: false,
    example: [
      {
        name: 'Facebook',
        url: 'https://facebook.com/example',
      },
    ],
  })
  @IsArray()
  @IsOptional()
  socialMedias?: {
    name: string;
    url: string;
  }[];
}
