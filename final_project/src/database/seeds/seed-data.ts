import { DataSource, In } from 'typeorm';
import Permission from '../entities/Permission';
import { Role } from '../entities/Role';
import { PERMISSION_LIST } from './data/permission.seeder';
import { ROLE_LIST } from './data/role.seeder';

export async function seedData(dataSource: DataSource): Promise<void> {
  const permissionRepository = dataSource.getRepository(Permission);
  const roleRepository = dataSource.getRepository(Role);

  const permissionList = PERMISSION_LIST;
  for (const permission of permissionList) {
    const _permission = permissionRepository.create(permission as Permission);
    await permissionRepository.upsert(_permission, ['name']);
  }

  const roleList = ROLE_LIST;
  for (const role of roleList) {
    const permissions = await permissionRepository.findBy({
      id: In(role.permissions),
    });
    console.log(permissions);
    const roleItem = {
      name: role.name,
      code: role.code,
    };
    const _role = roleRepository.create({
      ...roleItem,
      permissions: permissions,
    } as Role);
    console.log(_role);
    await roleRepository.upsert(_role, ['name']);
  }

  const role = await roleRepository.find({
    where: {
      code: 'ADMIN',
    },
    relations: ['permissions'],
  });
  console.log(role[0].permissions);
}
