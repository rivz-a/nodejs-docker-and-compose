import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.save(createWishlistDto);
  }

  findMany(query): Promise<Wishlist[]> {
    return this.wishlistRepository.find(query);
  }

  findOne(query): Promise<Wishlist> {
    return this.wishlistRepository.findOne(query);
  }

  async updateOne(
    id: number,
    updateOfferDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });

    if (!wishlist) {
      throw new NotFoundException('wishlist not found');
    }

    Object.assign(wishlist, updateOfferDto);

    return this.wishlistRepository.save(wishlist);
  }

  async removeOne(id: number): Promise<void> {
    const wish = await this.wishlistRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    await this.wishlistRepository.remove(wish);
  }
}
