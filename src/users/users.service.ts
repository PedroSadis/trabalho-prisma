import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service'; // Importe o PrismaService

@Injectable()
export class UsersService {
  // Injete o PrismaService no construtor
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Usa o Prisma Client para criar um usuário
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    // Usa o Prisma Client para buscar todos os usuários
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    // Usa o Prisma Client para buscar um usuário pelo ID
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Verifica se o usuário existe antes de atualizar
    await this.findOne(id);
    // Usa o Prisma Client para atualizar um usuário
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    // Verifica se o usuário existe antes de remover
    await this.findOne(id);
    // Usa o Prisma Client para remover um usuário
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // --- Métodos para Favoritos ---

  async addFavorite(userId: number, postId: number) {
    // Verifica se o usuário e o post existem (implemente findOne em PostService)
    // await this.findOne(userId);
    // await this.postsService.findOne(postId); // Necessário injetar PostService

    // Cria a relação de favorito
    return this.prisma.favorite.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    // TODO: Adicionar tratamento para caso o favorito já exista (pega erro de constraint unique)
  }

  async removeFavorite(userId: number, postId: number) {
     // Verifica se o usuário e o post existem (implemente findOne em PostService)
    // await this.findOne(userId);
    // await this.postsService.findOne(postId); // Necessário injetar PostService

    // Remove a relação de favorito pela chave composta
    return this.prisma.favorite.delete({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });
     // TODO: Adicionar tratamento para caso o favorito não exista
  }

   async findUserFavorites(userId: number) {
    await this.findOne(userId); // Garante que o usuário existe
    return this.prisma.favorite.findMany({
        where: { userId },
        include: { post: true }, // Inclui os dados do post favoritado
    });
}
}