import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterDto } from 'src/user/dtos/Register.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() newUserBody: RegisterDto) {
    return await this.userService.register(newUserBody);
  }

  @Get(':username')
  async getInfo(@Param('username') username: string) {
    return await this.userService.getInfo(username);
  }
}
