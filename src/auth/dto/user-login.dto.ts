import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserLoginDto {
  @IsNotEmpty({ message: 'User email is empty' })
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'User password is empty' })
  password: string;
}
