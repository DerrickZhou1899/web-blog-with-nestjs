import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'User first name is empty' })
  @IsString()
  firstName: string;
  @IsNotEmpty({ message: 'User last name is empty' })
  @IsString()
  lastName: string;
  @IsNotEmpty({ message: 'User email is empty' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Password is empty' })
  @IsString()
  password: string;
}
