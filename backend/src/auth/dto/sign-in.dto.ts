import { IsString, Length } from 'class-validator';

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
