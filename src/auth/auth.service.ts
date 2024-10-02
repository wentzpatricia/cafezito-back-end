import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UserService,
      private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) {
          throw new UnauthorizedException({message:'E-mail ou senha inválidos.'});
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return await this.gerarToken(user);
        }
        throw new UnauthorizedException({message:'E-mail ou senha inválidos.'});
      }
  
    async gerarToken(payload: User) {
      return {
        access_token: this.jwtService.sign(
          { email: payload.email },
          {
            secret: 'topSecret512',
            expiresIn: '50s',
          },
        ),
      };
    }
  }
  