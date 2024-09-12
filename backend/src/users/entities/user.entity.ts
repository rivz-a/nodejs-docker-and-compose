import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsEmail, IsDate, IsUrl } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  @Length(2, 10)
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 100)
  about: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
