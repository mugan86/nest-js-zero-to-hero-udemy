import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filer.dto';
@Injectable()
export class TasksService {
    private tasks: Array<Task> = [];

    getAll(): Array<Task> {
        return this.tasks;
    }

    getWithFilters(filtersDto: GetTasksFilterDto): Array<Task> {
        const { search, status} = filtersDto;

        // Definir un array temporal para el reultado
        let tasks = this.getAll();

        // filtrar con status

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        // filtrar con search

        if (search) {
            tasks = tasks.filter((task) => {
                return (task.title.includes(search) || task.description.includes(search));
            });
        }

        return tasks;
    }

    getById(id: string): Task {
        return this.tasks.find(value => value.id === id)
    }

    create(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const task = this.getById(id);
        task.status = status;
        return task;
    }
}
