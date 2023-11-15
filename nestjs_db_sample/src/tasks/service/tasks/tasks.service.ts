import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/database/entities/Task';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async findAllTask(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  async createTask(taskDetail: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({ ...taskDetail });
    return await this.taskRepository.save(newTask);
  }

  async findTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    return task;
  }

  async finishTask(id: number): Promise<UpdateResult> {
    const task = await this.taskRepository.findOne({ where: { id } });
    const updateTask = await this.taskRepository.update(id, {
      ...task,
      is_complete: true,
    });

    return updateTask;
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
