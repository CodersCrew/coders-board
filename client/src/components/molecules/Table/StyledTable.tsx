import React from 'react';
import { ClassNames } from '@emotion/core';
import { useTheme } from '@emotion/react';
import { Table as AntTable } from 'antd';
import { TableProps as AntTableProps } from 'antd/lib/table';
import clsx from 'clsx';
import { space, SpaceProps } from 'styled-system';

export type StyledTableProps<T> = AntTableProps<T> & SpaceProps;

export function StyledTable<T extends Record<string, unknown>>(props: StyledTableProps<T>) {
  const theme = useTheme();

  return (
    <ClassNames>
      {({ css }) => {
        const dynamicClassName = css(space({ ...props, theme }));

        const className = clsx(dynamicClassName, props.className);

        return <AntTable<T> {...props} className={className} />;
      }}
    </ClassNames>
  );
}
