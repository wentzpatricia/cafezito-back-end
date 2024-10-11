import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  export class CreateUserDto {
  
    @IsNotEmpty()
    @IsEmail({ require_tld: true }, { message: 'Por favor, insira um e-mail válido.' })
    email: string;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `A senha deve conter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.`,
    })
    password: string;

  }