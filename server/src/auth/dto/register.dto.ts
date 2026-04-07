import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name?: string;

  @IsString()
  username?: string;

  @IsString()
  @MinLength(8)
  password?: string;

  @IsString()
  address?: string;
}
