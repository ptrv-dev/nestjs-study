import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 128)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(8, 128)
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
