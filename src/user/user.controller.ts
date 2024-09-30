import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //POST http://localhost:3000/user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // GET http://localhost:3000/user
  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  // GET http://localhost:3000/user/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(id);
  }

  //PATCH http://localhost:3000/user/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // DELETE http://localhost:3000/user/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}