import {
  Controller,
  Req,
  Post,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalGuard } from '../auth/guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@Req() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    const { password: _, ...result } =
      await this.usersService.create(createUserDto);

    return result;
  }
}
