import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { CommanderModule } from './modules/commander/commander.module';

void CommandFactory.run(CommanderModule, { logger: new Logger() });
