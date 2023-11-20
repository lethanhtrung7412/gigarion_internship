import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { dataSourceOption } from './database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), TasksModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
