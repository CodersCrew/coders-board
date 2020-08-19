import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

import { Button, Icon } from '@/components/atoms';

import { TableAction } from './Table.types';

function getIsDisabled<T>(disabled: TableAction<T>['disabled'], record: T) {
  if (typeof disabled === 'undefined') {
    return false;
  }

  if (typeof disabled === 'boolean') {
    return disabled;
  }

  return disabled(record);
}

function getIsVisible<T>(visible: TableAction<T>['visible'], record: T) {
  if (typeof visible === 'undefined') {
    return true;
  }

  if (typeof visible === 'boolean') {
    return visible;
  }

  return visible(record);
}

function getClassName<T>(className: TableAction<T>['className'], record: T) {
  if (typeof className === 'undefined') {
    return undefined;
  }

  if (typeof className === 'string') {
    return className;
  }

  return className(record);
}

function renderActionButton<T>(rowId: number, record: T) {
  return ({ onClick, icon, label, disabled, className, visible, itemProps = {} }: TableAction<T>) => {
    const handleClick = () => onClick(record);
    const labelText = typeof label === 'string' ? label : label(record);

    if (!getIsVisible(visible, record)) {
      return null;
    }

    return (
      <Menu.Item
        key={rowId}
        className={getClassName(className, record)}
        disabled={getIsDisabled(disabled, record)}
        onClick={handleClick}
        {...itemProps}
      >
        <Icon icon={icon} />
        {labelText}
      </Menu.Item>
    );
  };
}

export function renderActions<T>(actions: TableAction<T>[]) {
  return (rowId: number, record: T) => {
    return (
      <Dropdown overlay={<Menu>{actions.map(renderActionButton(rowId, record))}</Menu>} trigger={['click']}>
        <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
      </Dropdown>
    );
  };
}
