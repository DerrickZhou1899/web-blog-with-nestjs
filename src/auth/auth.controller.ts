import { Controller, Post, Body, Res, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { CreateUserDto } from './dto/create_User.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(userLoginDto);
    console.log(user);
    res.cookie('IsAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 });
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.send({ success: true, user });
  }
  @Post('/register')
  async userRegistration(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('/create')
  async create(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.create(createAuthDto);
  }
}
