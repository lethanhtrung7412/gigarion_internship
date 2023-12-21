import { DataSource } from 'typeorm';
import { seedPermission, seedRole, testing } from './seed-data';
import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedPermission(dataSource);
  await seedRole(dataSource);
  await testing(dataSource);
  await app.close();
}
runSeeder();
