import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: AuthDto })
  async login(@Body() body: AuthDto) {
    return this.authService.validateUser(body.email, body.password);
  }
}
