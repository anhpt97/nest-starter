import { ObjectLiteral } from 'typeorm';

export const getColumnNames = <Entity extends ObjectLiteral>({
  tableAlias,
  selectedColumnNames,
  entity,
  excludedColumnNames,
  addColumnAlias,
}: {
  tableAlias: string;
  selectedColumnNames?: (keyof Entity)[];
  entity?: ObjectLiteral;
  excludedColumnNames?: (keyof Entity)[];
  addColumnAlias?: true;
}) => {
  if (selectedColumnNames) {
    return selectedColumnNames.map((columnName: string) =>
      addColumnAlias
        ? `${tableAlias}.${columnName} AS ${columnName}`
        : `${tableAlias}.${columnName}`,
    );
  }
  excludedColumnNames = excludedColumnNames || ['createdAt', 'updatedAt'];
  return Object.keys(entity).flatMap((columnName) =>
    excludedColumnNames.includes(columnName)
      ? []
      : addColumnAlias
        ? `${tableAlias}.${columnName} AS ${columnName}`
        : `${tableAlias}.${columnName}`,
  );
};
