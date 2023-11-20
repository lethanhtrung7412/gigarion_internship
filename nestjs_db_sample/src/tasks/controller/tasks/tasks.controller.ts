import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { TasksService } from 'src/tasks/service/tasks/tasks.service';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getAllTasks() {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Put(':id/complete')
  async finishTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.tasksService.finishTask(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.tasksService.deleteTask(id);
  }
}
