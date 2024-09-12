import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 10)
  username: string;

  @IsString()
  @Length(2, 100)
  about: string;

  @IsString()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
