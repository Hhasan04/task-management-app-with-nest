import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsNotEmpty()
  @IsDateString()
  dueDate!: string;
}
