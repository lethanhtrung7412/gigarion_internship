import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class AppModule {}
