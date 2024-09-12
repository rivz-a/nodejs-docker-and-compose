import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WishesService } from '../wishes/wishes.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { Like } from 'typeorm';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  findOwn(@Req() req) {
    return this.usersService.findOne({
      where: { id: req.user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Patch('me')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { ...user } = await this.usersService.update(
      req.user.id,
      updateUserDto,
    );

    return user;
  }

  @Get('me/wishes')
  async findOwnWishes(@Req() req) {
    return this.wishesService.find({
      where: { owner: req.user.id },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    return this.wishesService.find({
      where: { owner: { username } },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { username },
    });
  }

  @Post('find')
  @HttpCode(200)
  findMany(@Body('query') query: string): Promise<User[]> {
    return this.usersService.findMany({
      where: [{ email: Like(`%${query}%`) }, { username: Like(`%${query}%`) }],
    });
  }
}
