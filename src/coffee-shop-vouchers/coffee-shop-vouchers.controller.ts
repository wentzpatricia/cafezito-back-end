import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CoffeeShopVoucherService } from './coffee-shop-vouchers.service';
import { JwtAuthGuard, JwtPayload } from 'src/guards/auth.guard';
import { CreateCoffeeShopVouchersDto } from './dto/create-coffee-shop-vouchers.dto';
import { UpdateCoffeeShopVouchersDto } from './dto/update-cofee-shop-vouchers.dto';
import { Request } from 'express';

@ApiTags('Coffee Shop Vouchers')
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
      userId);
  }

  @Delete(':id')
  async removeVoucher(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string
    ) {
    return this.voucherService.removeVoucher(id, coffeeShopId);
  }

  @Get()
  async listVouchers() {
    return this.voucherService.listVouchers();
  }

  @Post(':id/redeem')
  async redeemVoucher(@Param('id') voucherId: string, @Req() request: Request) {
    const user = request.user as JwtPayload;
    const userId = user.id;

    try {
      return await this.voucherService.redeemVoucher(voucherId, userId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('redeem-by-qrcode')
  @ApiBody({ description: 'Código QR para resgatar o voucher' })
  @ApiResponse({ status: 200, description: 'Voucher resgatado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao resgatar o voucher.' })
  @ApiResponse({ status: 404, description: 'Voucher não encontrado ou expirado.' })
  async redeemByQRCode(
    @Body('qrCode') qrCode: string,
    @Req() request: Request,
  ) {
    const user = request.user as JwtPayload;
    const userId = user.id;

    try {
      return await this.voucherService.redeemVoucherByQRCode(qrCode, userId);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException('Erro interno ao resgatar o voucher.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/user')
  async listUserVouchers(@Req() request: Request) {
    const user = request.user as JwtPayload;
    const userId = user.id;
    return this.voucherService.listUserVouchers(userId);
  }
  

}
