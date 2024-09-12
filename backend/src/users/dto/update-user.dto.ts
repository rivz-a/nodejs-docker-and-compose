import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 10)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  about?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
