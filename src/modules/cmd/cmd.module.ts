import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { dataSource } from '~/data-source';
import { DatabaseModule } from '../database/database.module';
import { SeedCommand } from './seed.command';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), DatabaseModule],
  providers: [SeedCommand],
})
export class CmdModule {}
