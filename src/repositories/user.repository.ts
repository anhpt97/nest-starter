import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ErrorCode, UserStatus } from '~/common/enums';
import { User } from '~/entities';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    const { target, manager } = userRepository;
    super(target, manager);
  }

  async findOne(options: FindOneOptions<User>, validateStatus = false) {
    const select = options.select as (keyof User)[];
    if (select && !select.includes('status')) {
      select.push('status');
    }
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }
    if (validateStatus) {
      if (user.status === UserStatus.UNACTIVATED) {
        throw new UnauthorizedException(ErrorCode.UNACTIVATED_ACCOUNT);
      }
      if (user.status === UserStatus.SUSPENDED) {
        throw new ForbiddenException(ErrorCode.DISABLED_ACCOUNT);
      }
    }
    return user;
  }
}
