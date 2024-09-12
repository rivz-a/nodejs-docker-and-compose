import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  auth(user: User) {
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getProfile(username: string) {
    return this.usersService.findOne({ username: username });
  }

  async validatePassword(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({
      where: { username: username },
    });

    if (!user || !bcrypt.compare(password, user.password)) {
      return null;
    }

    return user;
  }
}
