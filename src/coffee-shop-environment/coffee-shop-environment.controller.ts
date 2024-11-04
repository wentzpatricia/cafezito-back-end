import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeShopEnvironmentService } from './coffee-shop-environment.service';
import { CreateCoffeeShopEnvironmentDto } from './dto/create-coffeee-shop-environment';

@Controller('coffee-shop/:coffeeShopId/environment')
export class CoffeeShopEnvironmentController {
  constructor(private readonly coffeeShopEnvironmentService: CoffeeShopEnvironmentService) {}

  // POST http://localhost:3000/coffee-shop/:coffeeShopId/environment
  @Post()
  create(
    @Param('coffeeShopId') coffeeShopId: string,
    @Body() createCoffeeShopEnvironmentDto: CreateCoffeeShopEnvironmentDto,
  ) {
    return this.coffeeShopEnvironmentService.createEnvironment(createCoffeeShopEnvironmentDto, coffeeShopId);
  }

  // PATCH http://localhost:3000/coffee-shop/:coffeeShopId/environment/:id
  @Patch(':id')
  update(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
    @Body() updateEnvironmentDto: any,
  ) {
    return this.coffeeShopEnvironmentService.updateEnvironment(id, updateEnvironmentDto, coffeeShopId);
  }

  // DELETE http://localhost:3000/coffee-shop/:coffeeShopId/environment/:id
  @Delete(':id')
  remove(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
  ) {
    return this.coffeeShopEnvironmentService.removeEnvironment(id, coffeeShopId);
  }
}
