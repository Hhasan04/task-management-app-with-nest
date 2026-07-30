import { Body, Controller, Post, Param, Get, Put, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.dto';
import { Task } from './tasks.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query('search') search?: string,
              @Query('status') status ?: TaskStatus,
              @Query('priority') priority ?: TaskPriority ) {
    return this.tasksService.getAllTasks(search, status, priority);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Put('/:id')
  updateTask(@Param('id') id: number, @Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, taskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id : number) : Promise<DeleteResult>{
    return this.tasksService.deleteTask(id);
  }
}
