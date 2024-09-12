import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { itemId, amount } = createOfferDto;

    const wish = await this.wishesService.findOne({
      where: { id: itemId },
      relations: { owner: true, offers: true },
    });

    if (!wish) {
      throw new Error('Wish not found');
    }

    if (wish.raised + amount > wish.price) {
      throw new Error(`Offer amount exceeds the remaining price`);
    }

    return this.offerRepository.save(createOfferDto);
  }

  findOne(query): Promise<Offer> {
    return this.offerRepository.findOne(query);
  }

  findMany(query): Promise<Offer[]> {
    return this.offerRepository.find(query);
  }
}
