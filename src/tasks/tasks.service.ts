import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

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

  getById(id: string): Task {
    const found = this.tasks.find((value) => value.id === id);

    // Si no encuentra el elemento, excepción. Servirá
    // para reutilizarlo para otros apartados donde
    // tengamos que obtener el elemento seleciconado
    // actualizar, eliminar,...
    if (!found) {
      throw new NotFoundException();
    }
    return found;
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
  }
}
