import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';

@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createOfferDto: CreateOfferDto) {
    const offer = await this.offersService.create(createOfferDto);

    if (!createOfferDto.hidden) {
      throw Error('Offer is not hidden');
    }

    return offer;
  }

  @Get()
  findAll() {
    return this.offersService.findMany({
      relations: { item: true, user: true },
      select: {
        user: {
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
  findOne(@Param('id') id: number) {
    return this.offersService.findOne({
      where: { id },
      relations: {
        item: true,
        user: true,
      },
      select: {
        user: {
          username: true,
        },
      },
    });
  }
}
