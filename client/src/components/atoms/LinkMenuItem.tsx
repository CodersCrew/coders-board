import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';

type LinkMenuItemProps = MenuItemProps & {
  to: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LinkMenuItem = forwardRef<any, LinkMenuItemProps>(({ to, children, ...props }, ref) => {
  return (
    <Menu.Item {...props} ref={ref}>
      <Link to={to}>{children}</Link>
    </Menu.Item>
  );
});
