import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    if (
      !value.toUpperCase() ||
      !this.allowedStatuses.includes(value.toUpperCase())
    ) {
      throw new BadRequestException(`'${value}' is not a valid status`);
    }

    return value;
  }
}
