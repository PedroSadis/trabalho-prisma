import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common'; // Adicione Put, HttpCode, HttpStatus
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // O '+' converte a string 'id' para número
    return this.usersService.findOne(+id);
  }

  // PATCH - Atualização parcial
  @Patch(':id')
  updatePartial(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // PUT - Atualização completa/substituição (requer todos os campos obrigatórios)
  // Usaremos o mesmo DTO e serviço, mas a semântica HTTP é diferente.
  // Pode requerer lógica adicional no serviço se a substituição total for estritamente necessária.
   @Put(':id')
   updateComplete(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     // Para uma substituição completa real com PUT, o DTO deveria conter todos os campos
     // e o serviço poderia primeiro deletar e recriar, ou validar que todos os campos estão presentes.
     // Aqui, vamos reutilizar o método de atualização parcial para simplicidade.
     // Se precisar de validação mais estrita para PUT (ex: todos os campos são obrigatórios),
     // crie um DTO específico para PUT ou adicione validação no serviço.
     return this.usersService.update(+id, updateUserDto);
   }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content em caso de sucesso
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // --- Rotas para Favoritos ---

  @Post(':userId/favorites/:postId')
  addFavorite(@Param('userId') userId: string, @Param('postId') postId: string) {
    return this.usersService.addFavorite(+userId, +postId);
  }

  @Delete(':userId/favorites/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFavorite(@Param('userId') userId: string, @Param('postId') postId: string) {
    return this.usersService.removeFavorite(+userId, +postId);
  }

  @Get(':userId/favorites')
  findUserFavorites(@Param('userId') userId: string) {
    return this.usersService.findUserFavorites(+userId);
  }
}