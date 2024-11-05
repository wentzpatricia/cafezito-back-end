import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    return from(
      this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      }),
    ).pipe(
      map((payload) => {
        console.log('Payload recebido do token JWT:', payload);
        request['user'] = payload;
        return true;
      }),
      catchError(() => {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }),
    );
  }

  private extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
