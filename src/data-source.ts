import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import {
  DB_HOST,
  DB_LOGGING,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_USER,
} from './common/constants';

export const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{js,ts}')],
  migrations: [join(process.cwd(), 'src', 'migrations', '*.ts')],
  logging: DB_LOGGING,
  synchronize: DB_SYNC,
});
