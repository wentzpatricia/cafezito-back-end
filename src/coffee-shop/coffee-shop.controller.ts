import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoffeeShopService } from './coffee-shop.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { ListCoffeeShopDto } from './dto/list-coffee-shop.dto';
import { ListCoffeeShopByIdDto } from './dto/list-coffee-shop-by-id.dto';
import { plainToInstance } from 'class-transformer';

@Controller('coffee-shop')
export class CoffeeShopController {
  constructor(private readonly coffeeShopService: CoffeeShopService) {}

  @Post()
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeeShopService.createCoffeeShop({ createCoffeeShopDto });
  }

  @Get()
  async findAll() {
    const coffeeShops = await this.coffeeShopService.findAllCoffeeShop();
    return plainToInstance(ListCoffeeShopDto, coffeeShops);
  }

  @Get(':id')
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
