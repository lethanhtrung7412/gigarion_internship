import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDtos } from 'src/auth/dtos/login.dto';
import { AuthService } from 'src/auth/service/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'User login' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() payload: LoginDtos) {
    return await this.authService.signIn(payload.email, payload.password);
  }
}
