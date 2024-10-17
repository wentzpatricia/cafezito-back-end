import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoffeShopService } from './coffe-shop.service';

@Controller('coffe-shop')
export class CoffeShopController {
  constructor(private readonly coffeShopService: CoffeShopService) {}

  //POST http://localhost:3000/coffeShop
  @Post()
  create(@Body() createCoffeShopDto: any) {
    return this.coffeShopService.createCoffeShop(createCoffeShopDto);
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
