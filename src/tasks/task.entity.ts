import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(
    () => User,
    user => user.tasks,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
