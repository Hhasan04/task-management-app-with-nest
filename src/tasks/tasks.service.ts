import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskDto } from './tasks.dto';
import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  getAllTasks(search ?: string, status ?: TaskStatus, priority ?: TaskPriority) {
    if(!search && !status && !priority){
      return this.tasksRepository.find();
    }

    const where: any = {}

    if(search) where.title = Like(`%${search}%`);

    if(status) where.status = status;

    if(priority) where.priority = priority;

    return this.tasksRepository.find({ where });
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) throw new NotFoundException(`Task with ${id} Not Found.`);

    return task;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    const task = this.tasksRepository.create(taskDto);

    return await this.tasksRepository.save(task);
  }

  async updateTask(id: number, taskDto: TaskDto) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ${id} Not Found.`);
    }

    Object.assign(task, taskDto);

    return await this.tasksRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) throw new NotFoundException(`Task with ${id} Not Found.`);

    return await this.tasksRepository.delete({ id });
  }
}
