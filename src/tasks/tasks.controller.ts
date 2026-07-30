import { Body, Controller, Post, Param, Get, Put, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.dto';
import { Task } from './tasks.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksQueryDto } from './get-tasks-query-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: GetTasksQueryDto) {
    return this.tasksService.getAllTasks(query);
  }

  @Get('statistics')
  statistics(){
    return this.tasksService.getStatistics();
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
