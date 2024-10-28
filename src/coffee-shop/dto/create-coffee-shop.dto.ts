import { Cost } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoffeeShopDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEnum(Cost, { message: 'Custo deve ser um dos valores permitidos:  BAIXO, MEDIO, ALTO'})
  cost: Cost;

  @IsNotEmpty()
  urlImage: string;
}
