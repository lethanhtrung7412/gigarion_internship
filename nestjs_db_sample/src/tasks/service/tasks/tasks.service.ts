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
  async findAllTask(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }
  async createTask(taskDetail: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...taskDetail,
      owner: {
        id: userId,
      },
    });
    return await this.taskRepository.save(newTask);
  }

  async findTask(id: number, ownerId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        owner: {
          id: ownerId,
        },
      },
    });

    return task;
  }

  async finishTask(id: number): Promise<UpdateResult> {
    const task = await this.taskRepository.findOne({ where: { id } });
    const updateTask = await this.taskRepository.update(id, {
      ...task,
      is_complete: !task.is_complete,
    });

    return updateTask;
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
