import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { FILTER, KEYWORD, LIMIT, PAGE, SORT } from '../dto';
import {
  DEFAULT_FILTER,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT,
} from '../interceptors';

export const ApiPagination = ({ sort } = { sort: DEFAULT_SORT }) =>
  applyDecorators(
    ApiQuery({
      name: LIMIT,
      type: 'number',
      required: false,
      example: DEFAULT_LIMIT,
    }),
    ApiQuery({
      name: PAGE,
      type: 'number',
      required: false,
      example: DEFAULT_PAGE,
    }),
    ApiQuery({
      name: KEYWORD,
      type: 'string',
      required: false,
    }),
    ApiQuery({
      name: FILTER,
      required: false,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
      example: JSON.stringify(DEFAULT_FILTER),
    }),
    ApiQuery({
      name: SORT,
      required: false,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
      example: JSON.stringify(sort),
    }),
  );
