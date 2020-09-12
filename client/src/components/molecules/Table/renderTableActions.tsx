import React from 'react';
import { isBoolean, isFunction, isNil, isString } from 'lodash-es';

import { isNotNil } from '@/utils/arrays';

import { ActionsDropdown, ActionsDropdownProps } from '../ActionsDropdown';
import { TableAction, TableRecord } from './Table.types';

function getIsDisabled<T extends TableRecord>(disabled: TableAction<T>['disabled'], record: T) {
  return isFunction(disabled) ? disabled(record) : disabled;
}

function getIsVisible<T extends TableRecord>(visible: TableAction<T>['visible'], record: T) {
  if (isNil(visible)) return true;

  if (isBoolean(visible)) return visible;

  return visible(record);
}

function getClassName<T extends TableRecord>(className: TableAction<T>['className'], record: T) {
  return isFunction(className) ? className(record) : className;
}

function tableActionsToActions<T extends TableRecord>(record: T) {
  return ({
    onClick,
    icon,
    label,
    disabled,
    className,
    visible,
    itemProps = {},
  }: TableAction<T>): ActionsDropdownProps['actions'][number] | null => {
    const handleClick = () => onClick(record);
    const labelText = isString(label) ? label : label(record);
    const customItemProps = 'apply' in itemProps ? itemProps(record) : itemProps;

    if (!getIsVisible(visible, record)) return null;

    return {
      label: labelText,
      className: getClassName(className, record),
      disabled: getIsDisabled(disabled, record),
      onClick: handleClick,
      icon,
      ...customItemProps,
    };
  };
}

export function renderTableActions<T extends TableRecord>(actions: TableAction<T>[]) {
  return (_: unknown, record: T) => {
    const parsedActions = actions.map(tableActionsToActions(record)).filter(isNotNil);

    return <ActionsDropdown actions={parsedActions} />;
  };
}
