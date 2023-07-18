import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 128)
  username: string;

  @IsString()
  @Length(8, 128)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}
