import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

import { Button, Icon } from '@/components/atoms';

import { TableAction, TableRecord } from './Table.types';

function getIsDisabled<T extends TableRecord>(disabled: TableAction<T>['disabled'], record: T) {
  if (typeof disabled === 'undefined') {
    return false;
  }

  if (typeof disabled === 'boolean') {
    return disabled;
  }

  return disabled(record);
}

function getIsVisible<T extends TableRecord>(visible: TableAction<T>['visible'], record: T) {
  if (typeof visible === 'undefined') {
    return true;
  }

  if (typeof visible === 'boolean') {
    return visible;
  }

  return visible(record);
}

function getClassName<T extends TableRecord>(className: TableAction<T>['className'], record: T) {
  if (typeof className === 'undefined') {
    return undefined;
  }

  if (typeof className === 'string') {
    return className;
  }

  return className(record);
}

function renderActionButton<T extends TableRecord>(record: T) {
  return ({ onClick, icon, label, disabled, className, visible, itemProps = {} }: TableAction<T>) => {
    const handleClick = () => onClick(record);
    const labelText = typeof label === 'string' ? label : label(record);
    const customItemProps = 'apply' in itemProps ? itemProps(record) : itemProps;

    if (!getIsVisible(visible, record)) {
      return null;
    }

    return (
      <Menu.Item
        key={labelText}
        className={getClassName(className, record)}
        disabled={getIsDisabled(disabled, record)}
        onClick={handleClick}
        {...customItemProps}
      >
        <Icon icon={icon} />
        {labelText}
      </Menu.Item>
    );
  };
}

export function renderActions<T extends TableRecord>(actions: TableAction<T>[]) {
  return (_: unknown, record: T) => {
    return (
      <Dropdown overlay={<Menu>{actions.map(renderActionButton(record))}</Menu>} trigger={['click']}>
        <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
      </Dropdown>
    );
  };
}
