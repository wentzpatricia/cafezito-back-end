import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoffeeShopEnvironmentService } from './coffee-shop-environment.service';
import { CreateCoffeeShopEnvironmentDto } from './dto/create-coffee-shop-environment.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('coffee-shop/:coffeeShopId/environment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CoffeeShopEnvironmentController {
  constructor(
    private readonly coffeeShopEnvironmentService: CoffeeShopEnvironmentService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCoffeeShopEnvironmentDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
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
