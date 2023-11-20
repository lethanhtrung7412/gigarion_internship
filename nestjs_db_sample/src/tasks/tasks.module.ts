import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks/tasks.controller';
import { TasksService } from './service/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/database/entities/Task';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
