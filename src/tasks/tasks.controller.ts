import { Body, Controller, Post, Param, Get, Put, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.dto';
import { Task } from './tasks.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';
import { TaskSortField} from './task-sort-field-enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query('search') search?: string,
              @Query('status') status ?: TaskStatus,
              @Query('priority') priority ?: TaskPriority,
              @Query('sortBy', new ParseEnumPipe(TaskSortField, {optional: true})) sortBy ?: TaskSortField,
              @Query('order') order ?: 'ASC' | 'DESC') {
    return this.tasksService.getAllTasks(search, status, priority, sortBy, order);
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
