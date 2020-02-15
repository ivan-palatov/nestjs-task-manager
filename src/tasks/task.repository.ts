import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async createTask({ title, description }: CreateTaskDto, user: User) {
    try {
      const task = await Task.create({
        title,
        description,
        status: TaskStatus.OPEN,
        userId: user.id,
      }).save();

      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create task for user ${user.name}. Dto: ${JSON.stringify({
          title,
          description,
        })}`,
        error.stack,
      );

      throw new InternalServerErrorException();
    }
  }

  async getTasks(filtersDto: GetTasksFilterDto, user: User) {
    const { status, search } = filtersDto;
    const query = this.createQueryBuilder('t')
      .select('t.*')
      .where('t."userId" = :userId', { userId: user.id });

    if (status) {
      query.andWhere('t.status = :status', { status });
    }

    if (search) {
      query.andWhere('(t.title ILIKE :search OR t.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.name}, DTO: ${JSON.stringify(
          filtersDto,
        )}`,
        error.stack,
      );

      throw new InternalServerErrorException();
    }
  }
}
