import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CoffeeShopService } from './coffee-shop.service';

import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { ListCoffeeShopDto } from './dto/list-coffee-shop.dto';
import { ListCoffeeShopByIdDto } from './dto/list-coffee-shop-by-id.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('coffee-shop')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CoffeeShopController {
  constructor(private readonly coffeeShopService: CoffeeShopService) {}

  @Post()
  @ApiBody({ type: CreateCoffeeShopDto })
  @ApiResponse({ status: 201, description: 'Cafeteria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeeShopService.createCoffeeShop({ createCoffeeShopDto });
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de cafeterias encontradas',
    type: [ListCoffeeShopDto],
  })
  async findAll() {
    const coffeeShops = await this.coffeeShopService.findAllCoffeeShop();
    return plainToInstance(ListCoffeeShopDto, coffeeShops);
  }

  @Get(':id')
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: string) {
    const coffeeShop = this.coffeeShopService.findCoffeeShopById(id);
    return plainToInstance(ListCoffeeShopByIdDto, coffeeShop);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecoffeShopDto: any) {
    return this.coffeeShopService.updateCoffeeShop(id, updatecoffeShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeShopService.removeCoffeeShop(id);
  }
}
