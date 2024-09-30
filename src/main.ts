import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Remove propriedades não definidas nos DTOs
    forbidNonWhitelisted: true,  // Retorna erro se propriedades extras forem passadas
    transform: true,    // Transforma tipos primitivos
  }));
  
  await app.listen(3000);
}
bootstrap();
