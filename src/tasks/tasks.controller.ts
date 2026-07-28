import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService,
    ) {};
 
    @Get("/getAll")
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    
    @Get("/getId/:id")
    getTaskById(@Param('id') id: number): Promise<Task | null> {
        return this.tasksService.getTaskById(id);
    }

    @Post("/create")
    createTask(@Body() taskDto: TaskDto): Promise<Task> {
        return this.tasksService.createTask(taskDto);
    }
}
