import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task "${id}" not found`);
    }

    return task;
  }

  createTask(data: CreateTaskDto) {
    return this.taskRepository.createTask(data);
  }

  async deleteTask(id: number) {
    const res = await this.taskRepository.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`Task "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    return task.save();
  }
}
