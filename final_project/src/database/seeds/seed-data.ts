import { DataSource, In } from 'typeorm';
import Permission from '../entities/Permission';
import { Role } from '../entities/Role';
import { PERMISSION_LIST } from './data/permission.seeder';
import { ROLE_LIST } from './data/role.seeder';

export async function seedPermission(dataSource: DataSource): Promise<void> {
  const permissionRepository = dataSource.getRepository(Permission);
  const permissionList = PERMISSION_LIST;

  for (const permission of permissionList) {
    const _permission = permissionRepository.create(permission as Permission);
    await permissionRepository.upsert(_permission, ['name']);
  }
}
export async function seedRole(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);

  const roleList = ROLE_LIST;
  for (const role of roleList) {
    const _permissions = await permissionRepository.findBy({
      code: In(role.permissions),
    });
    // console.log(_permissions);
    const roleItem = {
      name: role.name,
      code: role.code,
    };
    const _role = roleRepository.create({
      ...roleItem,
    });
    for (const permission of _permissions) {
      // console.log(permission);
      _role.addPermission(permission);
    }
    console.log(_role);
    // const result = await roleRepository.save(_role);
    // console.log(result);
  }
}

export async function testing(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);

  const result = await roleRepository.find({
    where: {
      code: 'ADMIN',
    },
    relations: {
      permissions: true,
    },
  });
  console.log(JSON.stringify(result, null, 2));
}
