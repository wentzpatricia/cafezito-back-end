import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoffeeShopRatingService } from './coffee-shop-rating.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { Request } from 'express';
import { CreateCoffeeShopRatingDto } from './dto/create-coffeee-shop-rating.dto';
import { JwtAuthGuard, JwtPayload } from 'src/guards/auth.guard';

@Controller('coffee-shop/:coffeeShopId/rating')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CoffeeShopRatingController {
  constructor(
    private readonly coffeeShopRatingService: CoffeeShopRatingService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCoffeeShopRatingDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async create(
    @Param('coffeeShopId') coffeeShopId: string,
    @Body() createCoffeeShopRatingDto: CreateCoffeeShopRatingDto,
    @Req() request: Request,
  ) {
    const user = request.user as JwtPayload;
    const userId = user.id;
    return this.coffeeShopRatingService.createRating(
      createCoffeeShopRatingDto,
      coffeeShopId,
      userId,
    );
  }

  @Patch(':id')
  async update(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
    @Body() updateRatingDto: CreateCoffeeShopRatingDto,
  ) {
    return this.coffeeShopRatingService.updateRating(
      id,
      updateRatingDto,
      coffeeShopId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
  ) {
    return this.coffeeShopRatingService.removeRating(id, coffeeShopId);
  }
}
