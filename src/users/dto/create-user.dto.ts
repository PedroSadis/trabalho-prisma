import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;
}