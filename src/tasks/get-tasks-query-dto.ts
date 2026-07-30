import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';
import { TaskSortField } from './task-sort-field-enum';
import { SortOrder } from './sort-order.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTasksQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskSortField)
  sortBy?: TaskSortField;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}