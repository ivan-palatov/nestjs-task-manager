import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask({ title, description }: CreateTaskDto) {
    return Task.create({ title, description, status: TaskStatus.OPEN }).save();
  }

  async getTasks(filtersDto: GetTasksFilterDto) {
    const { status, search } = filtersDto;
    const query = this.createQueryBuilder('t').select('t.*');

    if (status) {
      query.andWhere('t.status = :status', { status });
    }

    if (search) {
      query.andWhere('(t.title ILIKE :search OR t.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }
}
