import { PartialType } from '@nestjs/mapped-types';
 import { CreateAuthorDto } from './create-author.dto';
 import { IsInt, IsOptional } from 'class-validator';

 export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    // Se você permitir a alteração do userId associado (pode ter implicações)
    // @IsInt()
    // @IsOptional()
    // userId?: number;
 }