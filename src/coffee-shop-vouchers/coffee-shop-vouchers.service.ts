import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCoffeeShopVouchersDto } from './dto/create-coffee-shop-vouchers.dto';
import { UpdateCoffeeShopVouchersDto } from './dto/update-cofee-shop-vouchers.dto';

@Injectable()
export class CoffeeShopVoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async createVoucher(
    createVoucherDto: CreateCoffeeShopVouchersDto,
    coffeeShopId: string,
  ) {
    const {
      voucher,
      availableQuantity,
      validFrom,
      validUntil,
      redemptionCode,
    } = createVoucherDto;

    return this.prisma.voucherPromotional.create({
      data: {
        voucher,
        redeemed: false,
        availableQuantity,
        validFrom,
        validUntil,
        redemptionCode,
        coffeeShopId,
      },
    });
  }

  async updateVoucher(
    id: string,
    updateVoucherDto: UpdateCoffeeShopVouchersDto,
    coffeeShopId: string,
    userId: string,
  ) {
    const existingVoucher = await this.prisma.voucherPromotional.findFirst({
      where: { id, coffeeShopId },
    });

    if (!existingVoucher) {
      throw new NotFoundException('Voucher not found');
    }

    const {
      voucher,
      availableQuantity,
      validFrom,
      validUntil,
      redemptionCode,
    } = updateVoucherDto;

    return this.prisma.voucherPromotional.update({
      where: { id },
      data: {
        userId,
        voucher,
        availableQuantity,
        validFrom,
        validUntil,
        redemptionCode,
      },
    });
  }

  async removeVoucher(id: string, coffeeShopId: string) {
    const existingVoucher = await this.prisma.voucherPromotional.findFirst({
      where: { id, coffeeShopId },
    });

    if (!existingVoucher) {
      throw new NotFoundException('Voucher not found');
    }

    return this.prisma.voucherPromotional.delete({
      where: { id },
    });
  }
}
