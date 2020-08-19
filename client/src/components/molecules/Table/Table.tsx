import React from 'react';

import { renderActions } from './actions';
import { createColumns } from './createColumns';
import { StyledTable } from './StyledTable';
import { TableColumns, TableProps, TableRecord } from './Table.types';

export function Table<T extends TableRecord>({ actions, ...props }: TableProps<T>) {
  const columnsWithActions: TableColumns<T> = props.columns;

  if (actions && actions.length) {
    columnsWithActions.push({
      align: 'right',
      fixed: 'right',
      render: renderActions(actions),
    });
  }

  const columns = createColumns(columnsWithActions);

  return <StyledTable size="middle" rowKey="id" scroll={{ x: 'max-content' }} {...props} columns={columns} />;
}
