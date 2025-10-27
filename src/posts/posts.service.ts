import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    // Verifica se o Author associado existe
    const authorExists = await this.prisma.author.findUnique({
        where: { id: createPostDto.authorId },
    });
    if (!authorExists) {
        throw new NotFoundException(`Author with ID ${createPostDto.authorId} not found`);
    }

    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return this.prisma.post.findMany({ include: { author: true } }); // Inclui dados do autor
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true, favoritedBy: { include: { user: true } } }, // Inclui autor e quem favoritou
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id); // Verifica se o post existe

    // Se estiver atualizando authorId, verifica se o novo Author existe
    if (updatePostDto.authorId) {
        const authorExists = await this.prisma.author.findUnique({
            where: { id: updatePostDto.authorId },
        });
        if (!authorExists) {
            throw new NotFoundException(`Author with ID ${updatePostDto.authorId} not found`);
        }
    }


    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
     // A configuração atual do Prisma (`onDelete: RESTRICT`) impedirá a exclusão se houver favoritos.
    return this.prisma.post.delete({
      where: { id },
    });
  }
}