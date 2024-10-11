import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException({ message: 'E-mail já cadastrado' });
      }
      throw error;
    }
  }

  async findAllUser() {
    return this.prisma.user.findMany();
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async viewUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(updateUserDto.password, salt);

    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: hashPassword,
      },
    });
  }

  async removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
