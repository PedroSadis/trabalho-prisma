import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common'; // Adicione Put, HttpCode, HttpStatus
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  updatePartial(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  // PUT - Atualização completa
  @Put(':id')
  updateComplete(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
      // Validação mais estrita pode ser necessária no DTO ou serviço
     return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}