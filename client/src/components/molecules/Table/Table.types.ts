import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';

import { RFC } from '@/typings/components';

import { StyledTableProps } from './StyledTable';

type CustomProps = {
  visible?: boolean;
};

export type TableRecord = { id: string };

export type TableProps<T extends TableRecord> = Omit<StyledTableProps<T>, 'dataSource' | 'columns'> & {
  dataSource: T[];
  columns: TableColumns<T>;
  actions?: TableAction<T>[];
};

export type TableColumns<T extends TableRecord> = (
  | (ColumnGroupType<T> & CustomProps)
  | (ColumnType<T> & CustomProps)
)[];

type CustomItemProps = Omit<MenuItemProps, 'children' | 'onClick' | 'disabled' | 'className' | 'icon'>;

export type TableAction<T> = {
  label: ((record: T) => string) | string;
  onClick: (record: T) => void;
  icon: RFC<AntdIconProps>;
  disabled?: ((record: T) => boolean) | boolean;
  visible?: ((record: T) => boolean) | boolean;
  className?: ((record: T) => string) | string;
  itemProps?: ((record: T) => CustomItemProps) | CustomItemProps;
};

export type TableActions<T> = TableAction<T>[];
