import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs-task-manager',
  entities: [path.join(__dirname, '/../**/*.entity.*s')],
  synchronize: true,
};
