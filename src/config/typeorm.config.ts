import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';
import path from 'path';
import { ObjectLiteral } from 'typeorm';

const dbConfig = config.get<ObjectLiteral>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME ?? dbConfig.host,
  port: process.env.RDS_PORT ?? dbConfig.port,
  username: process.env.RDS_USERNAME ?? dbConfig.username,
  password: process.env.RDS_PASSWORD ?? dbConfig.password,
  database: process.env.RDS_DB_NAME ?? dbConfig.database,
  synchronize: process.env.TYPEORM_SYNC ?? dbConfig.synchronize,
  entities: [path.join(__dirname, '/../**/*.entity.*s')],
};
