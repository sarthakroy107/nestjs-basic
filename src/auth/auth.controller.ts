import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log('IN AUTH CONTROLLER');
    console.log(createUserDto);
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return await this.authService.signIn(loginCredentialsDto);
  }
}
