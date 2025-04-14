import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as _entities from '~/entities';
import * as _repositories from '~/repositories';

const entities = Object.values(_entities);
const repositories = Object.values(_repositories);

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: repositories,
  exports: repositories,
})
export class DatabaseModule {}
