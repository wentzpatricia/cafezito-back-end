import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CoffeeShopVoucherService } from './coffee-shop-vouchers.service';
import { JwtAuthGuard, JwtPayload } from 'src/guards/auth.guard';

import { CreateCoffeeShopVouchersDto } from './dto/create-coffee-shop-vouchers.dto';
import { UpdateCoffeeShopVouchersDto } from './dto/update-cofee-shop-vouchers.dto';

import { Request } from 'express';

@Controller('coffee-shop/:coffeeShopId/vouchers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CoffeeShopVoucherController {
  constructor(private readonly voucherService: CoffeeShopVoucherService) {}

  @Post()
  @ApiBody({ type: CreateCoffeeShopVouchersDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async createVoucher(
    @Param('coffeeShopId') coffeeShopId: string,
    @Body() createVoucherDto: CreateCoffeeShopVouchersDto,
  ) {
    return this.voucherService.createVoucher(createVoucherDto, coffeeShopId);
  }

  @Patch(':id')
  async updateVoucher(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateCoffeeShopVouchersDto,
    @Req() request: Request,
  ) {
    const user = request.user as JwtPayload;
    const userId = user.id;
    return this.voucherService.updateVoucher(
      id,
      updateVoucherDto,
      coffeeShopId,
      userId,
    );
  }

  @Delete(':id')
  async removeVoucher(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
  ) {
    try {
      return this.voucherService.removeVoucher(id, coffeeShopId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Voucher not found');
      }
      throw error;
    }
  }
}
