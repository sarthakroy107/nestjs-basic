import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { UserRoleEnum } from '../user.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  role: UserRoleEnum;

  @IsNumber()
  @Min(18)
  age: number;

  @IsEmail()
  email: string;
}
