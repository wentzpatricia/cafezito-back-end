import { Controller, Get } from "@nestjs/common/decorators";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoot(): string {
    return 'Bem-vindo ao Cafezito!!'; // ou qualquer mensagem que você queira exibir na raiz
  }

}
