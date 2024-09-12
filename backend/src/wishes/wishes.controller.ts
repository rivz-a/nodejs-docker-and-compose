import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get('last')
  findLast() {
    return this.wishesService.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: { owner: true },
      select: {
        owner: {
          username: true,
          id: true,
          avatar: true,
          about: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  @Get('top')
  findTop() {
    return this.wishesService.find({
      order: { copied: 'DESC' },
      take: 20,
      relations: {
        owner: true,
      },
      select: {
        owner: {
          username: true,
          id: true,
          avatar: true,
          about: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne({
      where: { id },
      relations: { owner: true, offers: true },
      select: {
        owner: {
          username: true,
          id: true,
          avatar: true,
          about: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne(id, updateWishDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.wishesService.removeOne(id);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async copy(@Req() req, @Param('id') id: number) {
    return this.wishesService.copy(id, req.user);
  }
}
