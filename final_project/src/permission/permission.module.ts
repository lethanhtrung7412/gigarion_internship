import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
})
export class PermissionModule {}
