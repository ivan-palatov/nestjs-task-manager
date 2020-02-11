import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    if (
      typeof value !== 'string' ||
      !this.allowedStatuses.includes((value as any).toUpperCase())
    ) {
      throw new BadRequestException(`'${value}' is not a valid status`);
    }

    return value;
  }
}
