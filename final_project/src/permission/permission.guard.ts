import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/Role';
import { Role as RoleEnum } from 'src/utils/enums/role.enum';
import { Repository } from 'typeorm';
import { Permissions } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const requirePermission = this.reflector.get<string>(
      Permissions,
      context.getHandler(),
    );
    if (!requirePermission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if (user.role.code === RoleEnum.ADMIN) {
      return true;
    }

    const role = await this.roleRepository.findOne({
      where: { code: user.role.code },
      relations: ['permissions'],
    });
    const rolePermissionCodes = role.permissions.map((p) => p.code);
    const hasPermission = rolePermissionCodes.includes(requirePermission);
    if (!hasPermission) {
      throw new UnauthorizedException(
        `You don't have permission to perform this actions`,
      );
    }
    console.log(hasPermission);
    return hasPermission;
    // return requirePermission.every((p) => hasPermission(userPermissions, p));
  }
}

// function hasPermission(userPermissions: string[], requiredPermission: string) {
//   return userPermissions.includes(requiredPermission);
// }
