import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPagination, ApiResponse } from '~/common/decorators';
import { PaginationQuery, Params } from '~/common/dto';
import { UserRole, UserStatus } from '~/common/enums';
import { User } from '~/entities';
import { UserDto, UserQuery } from './user.dto';
import { PaginatedUser } from './user.model';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiPagination()
  @ApiResponse({ model: PaginatedUser })
  getList(@Query() query: PaginationQuery) {
    return this.userService.getList(query);
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
  preview(@Res() res: Response) {
    const pdfDoc = this.userService.generateFile();
    pdfDoc.pipe(
      res.set({
        'Content-Disposition': 'inline; filename="file.pdf"',
        'Content-Type': 'application/pdf',
      }),
    );
    pdfDoc.end();
  }

  @Get('download')
  download(@Res() res: Response) {
    const pdfDoc = this.userService.generateFile();
    pdfDoc.pipe(res.attachment('file.pdf'));
    pdfDoc.end();
  }

  @Get(':id')
  @ApiResponse({ model: User })
  get(@Param() { id }: Params) {
    return this.userService.get(id);
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
