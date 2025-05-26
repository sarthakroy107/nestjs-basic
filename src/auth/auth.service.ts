import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      return {
        message: 'User singned up successfully',
        data: newUser,
      };
    } catch (error) {
      console.log(error);
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({
      email: loginCredentialsDto.email,
    });
    console.log(user);

    if (
      !user ||
      !(await bcrypt.compare(loginCredentialsDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const payload: JwtPayload = { email: loginCredentialsDto.email };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
