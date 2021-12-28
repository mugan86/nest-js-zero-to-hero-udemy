import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status';

export class GetTasksFilterDto {
  // Validamos el valor que sea opcional
  // Y que contenga un valor de los disponibles en el Enum
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Debes de añadir un valor adecuado',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
