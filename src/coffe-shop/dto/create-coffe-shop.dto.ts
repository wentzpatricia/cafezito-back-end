import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoffeShopDto {
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
  @IsString()
  environment: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  coffees: string;

  @IsNotEmpty()
  @IsString()
  rating: string;
}
