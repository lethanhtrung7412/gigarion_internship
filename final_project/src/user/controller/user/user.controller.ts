import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';
import { Permissions } from 'src/permission/permission.decorator';
import { PermissionGuard } from 'src/permission/permission.guard';
import { AssignRolePipe } from 'src/pipes/assign-role.pipe';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UpdateUserProfileDtos } from 'src/user/dtos/update.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(AssignRolePipe)
  async register(@Body() payload: RegisterDto) {
    return this.userService.register(payload);
  }
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('R')
  @Get('profile')
  async getUserLoginProfile(@Request() req) {
    return this.userService.getUserById(req.user.id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('R')
  @Get(':id')
  async getUserByIds(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('update/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() payload: UpdateUserProfileDtos,
  ) {
    return await this.userService.updateUserProfile(id, payload);
  }

  @Delete('delete/:id')
  async deleteProfile(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
