import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * GET /user
   * Lista todos los usuarios
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * GET /user/:id
   * Obtiene un usuario por ID
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  /**
   * POST /user
   * Crea un nuevo usuario
   */
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  /**
   * PATCH /user/:id
   * Actualiza un usuario
   */
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  /**
   * DELETE /user/:id
   * Elimina un usuario
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
