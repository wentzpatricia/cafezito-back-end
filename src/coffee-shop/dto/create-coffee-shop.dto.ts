import { ApiProperty } from '@nestjs/swagger';
import { Cost, ProductTag } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCoffeeShopDto {
  @ApiProperty({ description: 'Latitude da cafeteria' })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude da cafeteria' })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Nome da cafeteria' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Endereço da cafeteria' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Custo da cafeteria', enum: Cost })
  @IsNotEmpty()
  @IsEnum(Cost, {
    message: 'Custo deve ser um dos valores permitidos:  BAIXO, MEDIO, ALTO',
  })
  cost: Cost;

  @ApiProperty({
    description: 'Tags dos produtos',
    enum: ProductTag,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(ProductTag, { each: true, message: 'Valor para produto inválido' })
  product: ProductTag[];

  @ApiProperty({ description: 'URL da imagem da cafeteria' })
  @IsNotEmpty()
  urlImage: string;
}
