import { ConsoleLogger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { CmdModule } from './modules/cmd/cmd.module';

void CommandFactory.run(CmdModule, { logger: new ConsoleLogger() });
