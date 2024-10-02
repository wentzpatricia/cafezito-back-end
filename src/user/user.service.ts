import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashPassword;

    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({message:'E-mail já cadastrado'});
      }
      throw error;
    }
  }
  
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneByEmail(username: string) {
    return this.userRepository.findOneBy({ email: username });
  }

  viewUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}