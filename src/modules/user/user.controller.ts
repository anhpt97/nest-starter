import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination, ApiResponse } from '~/common/decorators';
import { PaginationQuery, Params } from '~/common/dto';
import { PaginationInterceptor } from '~/common/interceptors';
import { User } from '~/entities';
import { CreateUserDto, UpdateUserDto } from './user.dto';
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

  @Get(':id')
  @ApiResponse({ model: User })
  getById(@Param() { id }: Params) {
    return this.userService.getById(id);
  }

  @Post()
  @ApiResponse({ example: true })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @ApiResponse({ example: true })
  update(@Param() { id }: Params, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ example: true })
  delete(@Param() { id }: Params) {
    return this.userService.delete(id);
  }
}
