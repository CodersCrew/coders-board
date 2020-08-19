import { ColumnsType } from 'antd/lib/table';
import { omit } from 'lodash';

import { TableColumns, TableRecord } from './Table.types';

export const createColumns = <T extends TableRecord>(columns: TableColumns<T>) =>
  columns.filter(col => col.visible !== false).map(col => omit(col, 'visible')) as ColumnsType<T>;
