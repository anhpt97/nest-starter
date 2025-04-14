import { hashSync } from 'bcrypt';
import { Command, CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import { UserRole, UserStatus } from '~/common/enums';
import { User } from '~/entities';

@Command({ name: 'seed' })
export class SeedCommand extends CommandRunner {
  constructor(private dataSource: DataSource) {
    super();
  }

  async run() {
    await this.dataSource.transaction(async (manager) => {
      await manager.getRepository(User).save({
        id: '1',
        username: 'superadmin',
        hashedPassword: hashSync('123456', 10),
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
      });
    });
  }
}
