import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create_User.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
