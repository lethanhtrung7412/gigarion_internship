import { Injectable, PipeTransform } from '@nestjs/common';
import { RegisterDto, Role } from 'src/user/dtos/register.dto';

@Injectable()
export class AssignRolePipe implements PipeTransform {
  transform(dto: RegisterDto) {
    return {
      ...dto,
      roleCode: dto.roleCode || Role.USER,
    };
  }
}
