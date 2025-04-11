import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse as _ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Error, Response } from '../models';

export const ApiResponse = (
  ...args: {
    model?: Type;
    example?: any;
    type?: 'string' | 'number' | 'boolean' | 'object';
    isArray?: boolean;
    description?: string;
  }[]
) =>
  applyDecorators(
    ...args.reduce<MethodDecorator[]>(
      (acc, { description, example, isArray, model, type }, i) => {
        if (model) {
          acc.push(ApiExtraModels(model));
        }
        let data: SchemaObject | ReferenceObject;
        switch (true) {
          case Boolean(example):
            data = { example };
            break;
          case isArray:
            data = { items: { $ref: model && getSchemaPath(model), type } };
            break;
          default:
            data = { $ref: model && getSchemaPath(model), type };
            break;
        }
        acc.push(
          _ApiResponse({
            schema: {
              properties: { data } as Record<
                keyof Response,
                SchemaObject | ReferenceObject
              >,
            },
            status: `2XX${Array(i).fill(' ').join('')}` as '2XX',
            description,
          }),
        );
        return acc;
      },
      [],
    ),
    ApiExtraModels(Error),
    _ApiResponse({
      schema: {
        properties: { error: { $ref: getSchemaPath(Error) } } as Record<
          keyof Response,
          SchemaObject | ReferenceObject
        >,
      },
      status: '4XX',
    }),
  );
