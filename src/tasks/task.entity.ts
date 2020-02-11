import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  title: string;

  @Column('character varying')
  description: string;

  @Column('character varying', { default: TaskStatus.OPEN })
  status: TaskStatus;
}
