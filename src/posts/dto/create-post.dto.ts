import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título precisa ser uma string' })
  @IsNotEmpty({ message: 'Título não pode ser vazio' })
  @MaxLength(255, { message: 'Título pode ter no máximo 255 caracteres' }) // Exemplo de limite de tamanho
  title: string;

  @IsString({ message: 'Conteúdo precisa ser uma string' })
  @IsNotEmpty({ message: 'Conteúdo não pode ser vazio' })
  content: string;

  @IsInt({ message: 'ID do autor precisa ser um número inteiro' })
  @IsNotEmpty({ message: 'ID do autor não pode ser vazio' })
  authorId: number; // ID do Autor que está criando o post
}