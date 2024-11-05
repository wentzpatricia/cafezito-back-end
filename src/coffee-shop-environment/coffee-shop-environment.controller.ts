import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoffeeShopEnvironmentService } from './coffee-shop-environment.service';
import { CreateCoffeeShopEnvironmentDto } from './dto/create-coffee-shop-environment.dto';

@Controller('coffee-shop/:coffeeShopId/environment')
export class CoffeeShopEnvironmentController {
  constructor(
    private readonly coffeeShopEnvironmentService: CoffeeShopEnvironmentService,
  ) {}

  @Post()
  create(
    @Param('coffeeShopId') coffeeShopId: string,
    @Body() createCoffeeShopEnvironmentDto: CreateCoffeeShopEnvironmentDto,
  ) {
    return this.coffeeShopEnvironmentService.createEnvironment(
      createCoffeeShopEnvironmentDto,
      coffeeShopId,
    );
  }

  @Patch(':id')
  update(
    @Param('coffeeShopId') coffeeShopId: string,
    @Param('id') id: string,
    @Body() updateEnvironmentDto: any,
  ) {
    return this.coffeeShopEnvironmentService.updateEnvironment(
      id,
      updateEnvironmentDto,
      coffeeShopId,
    );
  }

  @Delete(':id')
  remove(@Param('coffeeShopId') coffeeShopId: string, @Param('id') id: string) {
    return this.coffeeShopEnvironmentService.removeEnvironment(
      id,
      coffeeShopId,
    );
  }
}
