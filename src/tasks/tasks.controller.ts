import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Array<Task> {
    // Si tenemos filtros, llamamos a getWithFilters,
    // Si no tenemos filtros, obtenemos todos
    if (Object.keys(filterDto).length) {
      return this.tasksService.getWithFilters(filterDto);
    }
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteById(id);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    // Cogemos el status únicamente y lo validamos con el Dto
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    console.log(id);
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatus(id, status);
  }
}
