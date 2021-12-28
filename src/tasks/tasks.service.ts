import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createItem(createTaskDto);
  }
}
/*
  getAll(): Array<Task> {
    return this.tasks;
  }

  getWithFilters(filtersDto: GetTasksFilterDto): Array<Task> {
    const { search, status } = filtersDto;

    // Definir un array temporal para el reultado
    let tasks = this.getAll();

    // filtrar con status

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // filtrar con search

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteById(id: string): void {
    // Con esto, preguntamos si encuentra ese elemento
    // Si no lo encuentra, nos da un error "not found"
    // con su mensaje. reutilizando lo del metodo
    const found = this.getById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    // Buscamos el elemento, si no existe, not found (reutiliza)
    const task = this.getById(id);
    task.status = status;
    return task;
  }*/
