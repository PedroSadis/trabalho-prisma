import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      // Verifica se o User associado existe
      const userExists = await this.prisma.user.findUnique({
        where: { id: createAuthorDto.userId },
      });
      if (!userExists) {
        throw new NotFoundException(`User with ID ${createAuthorDto.userId} not found`);
      }

      return await this.prisma.author.create({
        data: createAuthorDto,
      });
    } catch (error) {
       // Trata erro caso o userId já esteja sendo usado por outro Author (unique constraint)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
         throw new ConflictException(`User with ID ${createAuthorDto.userId} is already linked to an author.`);
      }
      throw error; // Re-lança outros erros
    }
  }

  async findAll() {
    return this.prisma.author.findMany({ include: { user: true } }); // Inclui dados do usuário
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: { user: true, posts: true }, // Inclui usuário e posts
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.findOne(id); // Verifica se o autor existe

    // Se estiver atualizando userId, verifica se o novo User existe e não está em uso
    if (updateAuthorDto.userId) {
       const userExists = await this.prisma.user.findUnique({
         where: { id: updateAuthorDto.userId },
       });
       if (!userExists) {
         throw new NotFoundException(`User with ID ${updateAuthorDto.userId} not found`);
       }
       // Verifica se o novo userId já não está sendo usado por OUTRO autor
       const existingAuthorLink = await this.prisma.author.findUnique({
          where: { userId: updateAuthorDto.userId }
       });
       if (existingAuthorLink && existingAuthorLink.id !== id) {
          throw new ConflictException(`User with ID ${updateAuthorDto.userId} is already linked to another author.`);
       }
    }


    try {
        return await this.prisma.author.update({
          where: { id },
          data: updateAuthorDto,
        });
    } catch (error) {
         // Trata erro caso o userId já esteja sendo usado por outro Author (unique constraint)
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new ConflictException(`User with ID ${updateAuthorDto.userId} is already linked to an author.`);
       }
       throw error;
    }

  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    // TODO: Considerar o que fazer com os posts do autor (ex: deletar em cascata ou desassociar)
    // A configuração atual do Prisma (`onDelete: RESTRICT`) impedirá a exclusão se houver posts.
    return this.prisma.author.delete({
      where: { id },
    });
  }
}