import { BadRequestException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { QueryError } from 'mysql2';
import { PaginatedDto, PaginationQuery } from '~/common/dto';
import { ErrorCode, Ix, SqlError } from '~/common/enums';
import { UserRepository } from '~/repositories';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async paginate({
    limit,
    page,
    keyword,
    filter: { role, status },
    sort,
  }: PaginationQuery) {
    const qb = this.userRepository.createQueryBuilder('user');
    if (keyword) {
      qb.andWhere('(user.username LIKE :keyword OR user.email LIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }
    if (role) {
      qb.andWhere('user.role = :role', { role });
    }
    if (status) {
      qb.andWhere('user.status = :status', { status });
    }
    const [users, count] = await qb
      .orderBy(sort.by, sort.direction)
      .take(limit)
      .skip(limit * (page - 1))
      .getManyAndCount();
    return new PaginatedDto({ results: users, total: count });
  }

  getById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create({ password, ...rest }: CreateUserDto) {
    try {
      await this.userRepository.insert({
        ...rest,
        hashedPassword: hashSync(password, 10),
      });
    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async update(id: string, { password, ...rest }: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    try {
      await this.userRepository.update(
        { id },
        {
          ...user,
          ...rest,
          hashedPassword: password && hashSync(password, 10),
        },
      );
    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async delete(id: string) {
    await this.userRepository.findOne({ select: ['id'], where: { id } });
    await this.userRepository.delete({ id });
  }

  private handleSqlError(error: QueryError) {
    const { code, message } = error;
    if (code === SqlError.ER_DUP_ENTRY) {
      if (message.includes(Ix.Username)) {
        throw new BadRequestException(ErrorCode.USERNAME_ALREADY_EXISTS);
      }
      if (message.includes(Ix.Email)) {
        throw new BadRequestException(ErrorCode.EMAIL_ALREADY_EXISTS);
      }
    }
    throw error;
  }
}
