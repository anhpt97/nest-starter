import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  SimpleColumnType,
  WithPrecisionColumnType,
  WithWidthColumnType,
} from 'typeorm/driver/types/ColumnTypes';

export const PrimaryKeyColumn = (options?: {
  generated?: false | 'uuid';
  name?: string;
}) =>
  PrimaryColumn(
    options?.generated === 'uuid'
      ? {
          generated: options?.generated,
          name: options?.name,
        }
      : {
          generated: options?.generated !== false,
          type: 'bigint',
          name: options?.name,
          unsigned: true,
        },
  );

export const ForeignKeyColumn = (options?: {
  generated?: false | 'uuid';
  name?: string;
  nullable?: boolean;
  select?: boolean;
}) =>
  options?.generated === 'uuid'
    ? ColumnVarChar({
        name: options?.name,
        length: 36,
        nullable: options?.nullable,
        select: options.select,
      })
    : ColumnInt({
        type: 'bigint',
        name: options?.name,
        nullable: options?.nullable !== false,
        select: options?.select,
        unsigned: true,
      });

export const ColumnBlob = (options?: {
  type?: SimpleColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any;
}) =>
  Column({
    type: options?.type || 'blob',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnBool = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: boolean;
}) =>
  Column({
    type: 'bool',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnDate = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: Date;
}) =>
  Column({
    type: 'date',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnDateTime = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: Date;
}) =>
  Column({
    type: 'datetime',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnDecimal = (options?: {
  type?: WithPrecisionColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: number;
  precision?: number;
  scale?: number;
}) =>
  Column({
    type: options?.type || 'decimal',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
    precision: options?.precision,
    scale: options?.scale,
    transformer: {
      to: (value) => value,
      from: (value) => Number(value),
    },
  });

export const ColumnEnum = (options: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any;
  enum: any;
}) =>
  Column({
    type: 'enum',
    name: options.name,
    nullable: options.nullable !== false,
    select: options.select,
    default: options.default,
    enum: options.enum,
  });

export const ColumnInt = (options?: {
  type?: WithWidthColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: number;
  unsigned?: boolean;
}) =>
  Column({
    type: options?.type || 'int',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
    unsigned: options?.unsigned,
  });

export const ColumnJson = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any;
}) =>
  Column({
    type: 'json',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnSet = (options: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any[];
  enum: any;
}) =>
  Column({
    type: 'set',
    name: options.name,
    nullable: options.nullable !== false,
    select: options.select,
    default: options.default,
    enum: options.enum,
  });

export const ColumnSimpleArray = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any[];
}) =>
  Column({
    type: 'simple-array',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnSimpleEnum = (options: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any;
  enum: any;
}) =>
  Column({
    type: 'simple-enum',
    name: options.name,
    nullable: options.nullable !== false,
    select: options.select,
    default: options.default,
    enum: options.enum,
  });

export const ColumnSimpleJson = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: any;
}) =>
  Column({
    type: 'simple-json',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnText = (options?: {
  type?: SimpleColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
  default?: string;
}) =>
  Column({
    type: options?.type || 'text',
    name: options?.name,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const ColumnUuid = (options?: {
  name?: string;
  nullable?: boolean;
  select?: boolean;
}) =>
  Column({
    generated: 'uuid',
    type: 'varchar',
    name: options?.name,
    length: 36,
    nullable: options?.nullable !== false,
    select: options?.select,
  });

export const ColumnVarChar = (options?: {
  name?: string;
  length?: number;
  nullable?: boolean;
  select?: boolean;
  default?: string;
}) =>
  Column({
    type: 'varchar',
    name: options?.name,
    length: options?.length || 255,
    nullable: options?.nullable !== false,
    select: options?.select,
    default: options?.default,
  });

export const CreatedAt = (options?: {
  type?: WithPrecisionColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
}) =>
  CreateDateColumn({
    type: options?.type || 'datetime',
    name: options?.name || 'created_at',
    nullable: options?.nullable !== false,
    select: options?.select === true,
  });

export const UpdatedAt = (options?: {
  type?: WithPrecisionColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
}) =>
  UpdateDateColumn({
    type: options?.type || 'datetime',
    name: options?.name || 'updated_at',
    nullable: options?.nullable !== false,
    select: options?.select === true,
  });

export const DeletedAt = (options?: {
  type?: WithPrecisionColumnType;
  name?: string;
  nullable?: boolean;
  select?: boolean;
}) =>
  DeleteDateColumn({
    type: options?.type || 'datetime',
    name: options?.name || 'deleted_at',
    nullable: options?.nullable !== false,
    select: options?.select === true,
  });
