import { Task } from 'src/tasks/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { unique: true })
  name: string;

  @Column('character varying')
  password: string;

  @OneToMany(
    () => Task,
    task => task.user,
    { eager: false },
  )
  tasks: Task[];
}
