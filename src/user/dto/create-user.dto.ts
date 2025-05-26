import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../user.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsNumber()
  @Min(18)
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
