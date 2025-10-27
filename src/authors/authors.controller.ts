import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common'; // Adicione Put, HttpCode, HttpStatus
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  updatePartial(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  // PUT - Atualização completa
   @Put(':id')
   updateComplete(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
     // Validação mais estrita pode ser necessária no DTO ou serviço para garantir que todos os campos obrigatórios sejam fornecidos para PUT
     // Como exemplo, reutilizaremos a lógica do PATCH.
     return this.authorsService.update(+id, updateAuthorDto);
   }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}