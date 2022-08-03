import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>, private jwtService: JwtService) { }
  async login(loginDto: UserLoginDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDto.email })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = this.jwtService.signAsync({
          email: user.email,
          id: user.id,
        });
        delete user.password;
        return { token, user };
      } else {
        throw new UnauthorizedException('Bad credentials');
      }
    }
  }
  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  async create(createUserDto: CreateUserDto) {
    return await this.repo.insert(createUserDto);
  }
  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const checkForEmail = await this.repo.findOne({ email });
    if (checkForEmail) {
      throw new BadRequestException('Email chosen');
    } else {
      const user = new User();
      Object.assign(user, createUserDto);
      this.repo.create(user);
      delete user.password;
      return user;
    }
  }
}
