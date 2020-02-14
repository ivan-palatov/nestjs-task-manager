import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User) {
    const task = await this.taskRepository.findOne({ id, userId: user.id });
    if (!task) {
      throw new NotFoundException(`Task "${id}" not found`);
    }

    return task;
  }

  createTask(data: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(data, user);
  }

  async deleteTask(id: number, user: User) {
    const res = await this.taskRepository.delete({ id, user });
    if (!res.affected) {
      throw new NotFoundException(`Task "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return task.save();
  }
}
