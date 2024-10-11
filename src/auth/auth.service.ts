import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException({
        message: 'E-mail ou senha inválidos.',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException({ message: 'E-mail ou senha inválidos.' });
  }

  async gerarToken(user: { email: string }) {
    return {
      access_token: this.jwtService.sign(
        { email: user.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION,
        },
      ),
    };
  }
}
