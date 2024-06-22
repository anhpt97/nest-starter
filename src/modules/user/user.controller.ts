import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination, ApiResponse } from '~/common/decorators';
import { PaginationQuery } from '~/common/dto';
import { User } from '~/entities';
import { CreateUserDto, UpdateUserDto, UserParams } from './user.dto';
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

  @Get(':id')
  @ApiResponse({ model: User })
  get(@Param() { id }: UserParams) {
    return this.userService.get(id);
  }

  @Post()
  @ApiResponse({ example: true })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @ApiResponse({ example: true })
  update(@Param() { id }: UserParams, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ example: true })
  delete(@Param() { id }: UserParams) {
    return this.userService.delete(id);
  }
}
