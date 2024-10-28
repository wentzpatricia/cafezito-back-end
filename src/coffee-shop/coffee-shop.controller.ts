import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeShopService } from './coffee-shop.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';

@Controller('coffee-shop')
export class CoffeeShopController {
  constructor(private readonly coffeeShopService: CoffeeShopService) {}

  //POST http://localhost:3000/coffee-shop
  @Post()
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeeShopService.createCoffeeShop({ createCoffeeShopDto });
  }

  // GET http://localhost:3000/coffee-shop
  @Get()
  findAll() {
    return this.coffeeShopService.findAllCoffeeShop();
  }

  // GET http://localhost:3000/coffee-shop/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeShopService.findCoffeeShopById(id);
  }

  //PATCH http://localhost:3000/coffee-shop/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecoffeShopDto: any) {
    return this.coffeeShopService.updateCoffeeShop(id, updatecoffeShopDto);
  }

  // DELETE http://localhost:3000/coffee-shop/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeShopService.removeCoffeeShop(id);
  }
}
