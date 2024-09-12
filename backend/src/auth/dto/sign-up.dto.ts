import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  about?: string;
}
