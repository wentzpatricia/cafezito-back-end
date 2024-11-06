import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

export interface TokenPayload {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<TokenPayload> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException({
        message: 'E-mail ou senha inválidos.',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return await this.gerarToken({ id: user.id, email: user.email });
    }
    throw new UnauthorizedException({ message: 'E-mail ou senha inválidos.' });
  }

  async gerarToken(user: { id: string; email: string }): Promise<TokenPayload> {
    return {
      access_token: this.jwtService.sign(
        { id: user.id, email: user.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION,
        },
      ),
    };
  }
}
