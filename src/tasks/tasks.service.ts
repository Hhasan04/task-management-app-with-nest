import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskDto } from './tasks.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ) {}

    getAllTasks() {
        return this.tasksRepository.find();
    }

    getTaskById(id: number): Promise<Task | null> {
        return this.tasksRepository.findOneBy({ id });
    }

    async createTask(taskDto: TaskDto): Promise<Task> {
        const task = this.tasksRepository.create(taskDto);

        return await this.tasksRepository.save(task);
    }
}
