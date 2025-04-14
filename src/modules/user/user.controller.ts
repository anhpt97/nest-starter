import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination, ApiResponse } from '~/common/decorators';
import { PaginationQuery, Params } from '~/common/dto';
import { UserRole, UserStatus } from '~/common/enums';
import { PaginationInterceptor } from '~/common/interceptors';
import { User } from '~/entities';
import { UserDto, UserQuery } from './user.dto';
import { PaginatedUser } from './user.model';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(new PaginationInterceptor())
  @ApiPagination()
  @ApiResponse({ model: PaginatedUser })
  paginate(@Query() query: PaginationQuery) {
    return this.userService.paginate(query);
  }

  @Get('roles')
  @ApiResponse({ example: Object.values(UserRole) })
  getRoles(@Query() query: UserQuery) {
    return this.userService.getRoles(query);
  }

  @Get('statuses')
  @ApiResponse({ example: Object.values(UserStatus) })
  getStatuses(@Query() query: UserQuery) {
    return this.userService.getStatuses(query);
  }

  @Get('preview')
  preview() {
    const pdfDoc = this.userService.generateFile();
    pdfDoc.end();
    return new StreamableFile(pdfDoc as any, {
      type: 'application/pdf',
      disposition: 'inline; filename="file.pdf"',
    });
  }

  @Get('download')
  download() {
    const pdfDoc = this.userService.generateFile();
    pdfDoc.end();
    return new StreamableFile(pdfDoc as any, {
      type: 'application/pdf',
      disposition: 'attachment; filename="file.pdf"',
    });
  }

  @Get(':id')
  @ApiResponse({ model: User })
  getById(@Param() { id }: Params) {
    return this.userService.getById(id);
  }

  @Post()
  @ApiResponse({ example: true })
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @ApiResponse({ example: true })
  update(@Param() { id }: Params, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ example: true })
  delete(@Param() { id }: Params) {
    return this.userService.delete(id);
  }
}
