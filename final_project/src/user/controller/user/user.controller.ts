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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';
import { Permissions } from 'src/permission/permission.decorator';
import { PermissionGuard } from 'src/permission/permission.guard';
import { AssignRolePipe } from 'src/pipes/assign-role.pipe';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UpdateUserProfileDtos } from 'src/user/dtos/update.dto';
import { UserService } from 'src/user/service/user/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiBody(RegisterDto)
  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  @UsePipes(AssignRolePipe)
  async register(@Body() payload: RegisterDto) {
    return this.userService.register(payload);
  }
  @ApiOperation({ summary: 'Admin create a new User' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('C')
  @Post('new')
  async createNewUser(@Body() payload: RegisterDto) {
    return this.userService.register(payload);
  }

  @ApiOperation({ summary: 'Get the login user profile' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('R')
  @Get('profile')
  async getUserLoginProfile(@Request() req) {
    return this.userService.getUserById(req.user.id);
  }

  @ApiOperation({ summary: 'Admin get the user profile by Id' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('R')
  @Get(':id')
  async getUserByIds(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Admin get all users data' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('all')
  async getAllUser() {
    return await this.userService.getAllUser();
  }
  @ApiOperation({ summary: 'Admin Update the user profile' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('U')
  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() payload: UpdateUserProfileDtos,
  ) {
    return await this.userService.updateUserProfile(id, payload);
  }
  @ApiOperation({ summary: 'Admin delete the user by Id' })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions('D')
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
