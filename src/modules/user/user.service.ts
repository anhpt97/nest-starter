import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryError } from 'mysql2';
import { join } from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PaginatedDto, PaginationQuery } from '~/common/dto';
import { ErrorCode, Ix, SqlError } from '~/common/enums';
import { User } from '~/entities';
import { UserRepository } from '~/repositories';
import { UserDto, UserQuery } from './user.dto';

@Injectable()
export class UserService {
  private fontsDirPath = join(process.cwd(), 'fonts');

  private printer: PdfPrinter;

  constructor(private userRepository: UserRepository) {
    this.printer = new PdfPrinter({
      Roboto: {
        normal: join(this.fontsDirPath, 'Roboto-Regular.ttf'),
        bold: join(this.fontsDirPath, 'Roboto-Medium.ttf'),
        italics: join(this.fontsDirPath, 'Roboto-Italic.ttf'),
        bolditalics: join(this.fontsDirPath, 'Roboto-MediumItalic.ttf'),
      },
    });
  }

  async paginate({
    limit,
    page,
    keyword,
    filter: { role, status },
    sort,
  }: PaginationQuery) {
    const qb = this.userRepository.createQueryBuilder('user');
    if (keyword) {
      qb.andWhere('user.username LIKE :keyword OR user.email LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }
    if (role) {
      qb.andWhere('user.role = :role', { role });
    }
    if (status) {
      qb.andWhere('user.status = :status', { status });
    }
    qb.orderBy(sort.by, sort.direction)
      .take(limit)
      .skip(limit * (page - 1));
    const [users, total] = await qb.getManyAndCount();
    return new PaginatedDto({ results: users, total });
  }

  async getRoles({ keyword }: UserQuery) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .select('DISTINCT user.role as role');
    if (keyword) {
      qb.andWhere('user.role LIKE :keyword', { keyword: `%${keyword}%` });
    }
    const users: User[] = await qb.getRawMany();
    return users.map((user) => user.role);
  }

  async getStatuses({ keyword }: UserQuery) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .select('user.status AS status');
    if (keyword) {
      qb.andWhere('user.status LIKE :keyword', { keyword: `%${keyword}%` });
    }
    qb.groupBy('user.status');
    const users: User[] = await qb.getRawMany();
    return users.map((user) => user.status);
  }

  generateFile() {
    const docDefinition: TDocumentDefinitions = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
      ],
    };
    return this.printer.createPdfKitDocument(docDefinition);
  }

  getById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(dto: UserDto) {
    try {
      await this.userRepository.insert(dto);
    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async update(id: string, dto: UserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    try {
      await this.userRepository.update({ id }, { ...user, ...dto });
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
    throw new InternalServerErrorException(error);
  }
}
