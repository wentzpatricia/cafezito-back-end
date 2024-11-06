import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsDateString, IsString } from 'class-validator';

export class UpdateCoffeeShopVouchersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  voucher?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  availableQuantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  validFrom?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  validUntil?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  redemptionCode?: string;
}
