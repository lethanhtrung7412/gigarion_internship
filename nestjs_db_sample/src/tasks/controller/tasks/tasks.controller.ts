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
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { TasksService } from 'src/tasks/service/tasks/tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getAllTasks(@Request() req) {
    return this.tasksService.findAllTask(req.user.sub);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const task = await this.tasksService.findTask(id, req.user.sub);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return await this.tasksService.createTask(createTaskDto, req.user.sub);
  }

  @Put(':id/complete')
  async finishTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const task = await this.tasksService.findTask(id, req.user.sub);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.tasksService.finishTask(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const task = await this.tasksService.findTask(id, req.user.sub);

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.tasksService.deleteTask(id);
  }
}
