import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create_User.dto';

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
      throw new UnauthorizedException('Bad credentials - email mismatch');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = await this.jwtService.signAsync({
          email: user.email,
          id: user.id,
        });
        delete user.password;
        return { token, user };
      } else {
        throw new UnauthorizedException('Bad credentials - password mismatch');
      }
    }
  }
  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.repo.insert(createUserDto);
  }
  async register(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    console.log(email);
    const checkForEmail = await this.repo.findOneBy({ email: email });
    if (checkForEmail) {
      throw new BadRequestException('Email chosen');
    } else {
      const user = new User();
      Object.assign(user, createUserDto);
      this.repo.insert(user);
      return user;
    }
  }
}
