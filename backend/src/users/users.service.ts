import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto | SignUpDto): Promise<User> {
    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    const user = await this.usersRepository.save(createUserDto);

    return user;
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save({ id, ...updateUserDto });
  }

  findOne(query): Promise<User> {
    const user = this.usersRepository.findOne(query);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneId(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  findMany(query): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async updateOne(query, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: query });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async removeOne(query): Promise<void> {
    const user = await this.usersRepository.findOne({ where: query });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
  }
}
