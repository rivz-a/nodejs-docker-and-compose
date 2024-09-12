import { IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;
}
