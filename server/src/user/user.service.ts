import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /** GET /user */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /** GET /user/:id */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  /** POST /user */
  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashed });
    return this.userRepository.save(user);
  }

  /** PATCH /user/:id */
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  /** DELETE /user/:id */
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `Usuario ${id} eliminado` };
  }
}
