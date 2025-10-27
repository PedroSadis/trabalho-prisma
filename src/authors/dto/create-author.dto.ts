import { IsOptional, IsString, Length } from "class-validator";

export class CreateAuthorDto {
    @IsString({ message: 'Nome precisa ser uma string' })
    name: string;

    @IsString({ message: 'Bio precisa ser uma string' })
    @IsOptional()
    @Length(0, 500, { message: 'Bio pode ter no máximo 500 caracteres' })
    bio?: string;
}