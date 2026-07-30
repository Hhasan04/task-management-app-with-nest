import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskDto } from './tasks.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksQueryDto } from './get-tasks-query-dto';
import { SortOrder } from './sort-order.enum';
import { TaskPriority } from './task-priority.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(queryDto: GetTasksQueryDto) {
    const {
      search,
      status,
      priority,
      sortBy,
      order = SortOrder.ASC,
      page,
      limit,
    } = queryDto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (search) {
      query.andWhere(
        `(task.title Like :search OR task.description Like :search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }

    if (priority) {
      query.andWhere(`task.priority = :priority`, { priority });
    }

    if (sortBy) query.orderBy(`task.${sortBy}`, order);

    if (page && limit) {
      query.skip((page - 1) * limit).take(limit);
    }

    const [tasks, total] = await query.getManyAndCount();

    return {
      data: tasks,
      total,
      page: page ?? 1,
      limit: limit ?? total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
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

  async getStatistics() {
    const total = await this.tasksRepository.count();

    const todo = await this.tasksRepository.count({
      where: { status: TaskStatus.TODO },
    });

    const inProgress = await this.tasksRepository.count({
      where: { status: TaskStatus.IN_PROGRESS },
    });

    const completed = await this.tasksRepository.count({
      where: { status: TaskStatus.COMPLETED },
    });

    const low = await this.tasksRepository.count({
      where: { priority: TaskPriority.LOW },
    });

    const medium = await this.tasksRepository.count({
      where: { priority: TaskPriority.MEDIUM },
    });

    const high = await this.tasksRepository.count({
      where: { priority: TaskPriority.HIGH },
    });

    return {
      total,
      status: {
        todo,
        inProgress,
        completed
      },
      priority: {
        low,
        medium,
        high
      },
    };
  }
}
