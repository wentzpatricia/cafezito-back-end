import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeShopService } from './coffee-shop.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';

@Controller('coffee-shop')
export class CoffeeShopController {
  constructor(private readonly coffeShopService: CoffeeShopService) {}

  //POST http://localhost:3000/coffeShop
  @Post()
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeShopService.createCoffeeShop({ createCoffeeShopDto });
  }

  // GET http://localhost:3000/coffeShop
  @Get()
  findAll() {
    return this.coffeShopService.findAllCoffeShop();
  }

  // GET http://localhost:3000/coffeShop/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeShopService.findCoffeShopById(id);
  }

  //PATCH http://localhost:3000/coffeShop/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecoffeShopDto: any) {
    return this.coffeShopService.updateCoffeShop(id, updatecoffeShopDto);
  }

  // DELETE http://localhost:3000/coffeShop/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeShopService.removeCoffeShop(id);
  }
}
