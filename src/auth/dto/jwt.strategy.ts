import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      secretOrKey: 'superTopSecret',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    // payload is the decoded JWT
    const { email } = payload;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid access token');

    return user;
  }
}
