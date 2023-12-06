import { DataSource, DataSourceOptions } from 'typeorm';
import User from './entities/User';
import Permission from './entities/Permission';
import { Role } from './entities/Role';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'final',
  entities: [User, Permission, Role],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
};

export const seedSourceOptions: DataSourceOptions = {
  ...dataSourceOptions,
  logging: ['error', 'warn'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
