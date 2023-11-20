import { DataSource, DataSourceOptions } from 'typeorm';
import { Task } from './entities/Task';
import { User } from './entities/User';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'todolist',
  entities: [Task, User],
  // migrations: [__dirname + '/migrations/*.{ts,js}'],
  // migrationsTableName: 'migrations',
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
