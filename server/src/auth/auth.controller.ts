import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/register
   * Registra un nuevo usuario
   */
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /auth/login
   * Autentica al usuario y devuelve un JWT
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: { user: Express.User }) {
    return this.authService.login(req.user as any);
  }

  /**
   * GET /auth/profile
   * Devuelve el perfil del usuario autenticado (requiere JWT)
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: { user: Express.User }) {
    return req.user;
  }
}
