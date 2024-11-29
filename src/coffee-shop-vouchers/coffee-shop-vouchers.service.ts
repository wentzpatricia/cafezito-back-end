import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as QRCode from 'qrcode';

import { CreateCoffeeShopVouchersDto } from './dto/create-coffee-shop-vouchers.dto';
import { UpdateCoffeeShopVouchersDto } from './dto/update-cofee-shop-vouchers.dto';

@Injectable()
export class CoffeeShopVoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async createVoucher(createVoucherDto: CreateCoffeeShopVouchersDto, coffeeShopId: string) {
    if (!coffeeShopId) {
      throw new BadRequestException('O coffeeShopId é obrigatório.');
    }
  
    const redemptionCode = this.generateUniqueCode();
    const qrCodeUrl = await this.generateVoucherQRCode(redemptionCode);
  
    return this.prisma.voucherPromotional.create({
      data: {
        ...createVoucherDto,
        coffeeShopId,
        redemptionCode,
        qrCodeUrl,
        redeemed: false,
      },
    });
  }
  
  async updateVoucher(id: string, updateVoucherDto: UpdateCoffeeShopVouchersDto, coffeeShopId: string, userId: string) {
    const existingVoucher = await this.prisma.voucherPromotional.findFirst({
      where: { id, coffeeShopId },
    });

    if (!existingVoucher) {
      throw new NotFoundException('Voucher não encontrado');
    }

    return this.prisma.voucherPromotional.update({
      where: { id },
      data: {
        ...updateVoucherDto,
      },
    });
  }

  async redeemVoucher(voucherId: string, userId: string) {
    const voucher = await this.prisma.voucherPromotional.findUnique({
      where: { id: voucherId },
    });
  
    if (!voucher) {
      throw new NotFoundException('Voucher não encontrado.');
    }
  
    if (voucher.redeemed || voucher.availableQuantity <= 0 || voucher.validUntil < new Date()) {
      throw new BadRequestException('Voucher inválido ou já resgatado.');
    }
  
    const existingRedemption = await this.prisma.userVoucher.findUnique({
      where: {
        userId_voucherId: { userId, voucherId },
      },
    });
  
    if (existingRedemption) {
      throw new BadRequestException('Você já resgatou este voucher.');
    }
  
    await this.prisma.userVoucher.create({
      data: {
        userId,
        voucherId,
        redeemedAt: new Date(),
      },
    });
  
    return this.prisma.voucherPromotional.update({
      where: { id: voucherId },
      data: {
        availableQuantity: voucher.availableQuantity - 1,
      },
    });
  }
  

  async removeVoucher(id: string, coffeeShopId: string) {
    const existingVoucher = await this.prisma.voucherPromotional.findFirst({
      where: { id, coffeeShopId },
    });

    if (!existingVoucher) {
      throw new NotFoundException('Voucher não encontrado');
    }

    return this.prisma.voucherPromotional.delete({ where: { id } });
  }

  async listVouchers() {
    return this.prisma.voucherPromotional.findMany({
      include: {
        coffeeShop: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });
  }
  
  async generateVoucherQRCode(redemptionCode: string): Promise<string> {
    return QRCode.toDataURL(redemptionCode);
  }

  private generateUniqueCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async redeemVoucherByQRCode(qrCode: string, userId: string) {
    const voucher = await this.prisma.voucherPromotional.findFirst({
      where: { redemptionCode: qrCode, validUntil: { gte: new Date() } },
    });
  
    if (!voucher) {
      throw new NotFoundException('Voucher inválido ou expirado.');
    }
  
    const userVoucher = await this.prisma.userVoucher.findFirst({
      where: { userId, voucherId: voucher.id },
    });
  
    if (userVoucher) {
      throw new BadRequestException('Código QrCode já utilizado.');
    }
  
    await this.prisma.userVoucher.create({
      data: {
        userId,
        voucherId: voucher.id,
      },
    });
  
    return { message: 'Voucher resgatado com sucesso!' };
  }

  async listUserVouchers(userId: string) {
    return this.prisma.userVoucher.findMany({
      where: { userId },
      include: {
        voucher: {
          include: {
            coffeeShop: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
      },
    });
  }
  
  
}
