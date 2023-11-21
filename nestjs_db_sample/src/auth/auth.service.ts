import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.getInfo(username);
    if (!user || !bcrypt.compare(user.password, password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
