/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserLoginDto {
  @IsNotEmpty({ message: 'User email is empty' })
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
