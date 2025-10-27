import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateAuthorDto {
    @IsString({ message: 'Nome precisa ser uma string' })
    @IsNotEmpty() // Adicionado para garantir que o nome não seja vazio
    name: string;

    @IsString({ message: 'Bio precisa ser uma string' })
    @IsOptional()
    @Length(0, 500, { message: 'Bio pode ter no máximo 500 caracteres' })
    bio?: string;

    @IsInt({ message: 'User ID precisa ser um número inteiro' }) // Garante que é um número inteiro
    @IsNotEmpty({ message: 'User ID não pode ser vazio' }) // Garante que foi fornecido
    userId: number; // Campo para vincular ao User
}