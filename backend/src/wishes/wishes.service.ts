import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesRepository.save(createWishDto);
  }

  findOne(query): Promise<Wish> {
    return this.wishesRepository.findOne(query);
  }

  find(query): Promise<Wish[]> {
    return this.wishesRepository.find(query);
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    Object.assign(wish, updateWishDto);

    return this.wishesRepository.save(wish);
  }

  async removeOne(id: number): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    await this.wishesRepository.remove(wish);

    return wish;
  }

  async copy(idWish: number, owner: User): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: { id: idWish },
    });

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    wish.copied += 1;

    const newWish = this.wishesRepository.create({
      ...wish,
      owner,
      id: undefined,
    });

    await this.wishesRepository.save(newWish);

    return newWish;
  }
}
