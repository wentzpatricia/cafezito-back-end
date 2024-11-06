import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoffeeShopVouchersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  voucher: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  availableQuantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  //@IsDate()
  validFrom?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  //@IsDate()
  validUntil?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  redemptionCode?: string;
}
