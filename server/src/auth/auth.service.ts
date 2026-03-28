import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'name',
        'role',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async register(dto: RegisterDto) {
    const exists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('El email ya está registrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashed });
    const saved = (await this.userRepository.save(user)) as User & {
      password: string;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = saved;
    return { user: result, access_token: this.signToken(saved) };
  }

  async login(user: Omit<User, 'password'>) {
    return { user, access_token: this.signToken(user as User) };
  }

  private signToken(user: Pick<User, 'id' | 'email' | 'role'>) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
