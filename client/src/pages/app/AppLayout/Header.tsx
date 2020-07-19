import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';

import { CFC } from '@/typings/components';

type HeaderProps = BasicProps & {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const StyledHeader = styled(Layout.Header)(({ theme }) => ({
  padding: '0 16px',
  background: theme.colors.background.component,
  boxShadow: '0 1px 4px rgba(0,21,41,.08)',
  zIndex: 1,
}));

export const Header: CFC<HeaderProps> = ({ isSidebarCollapsed, toggleSidebar, ...props }) => {
  return (
    <StyledHeader {...props}>
      {React.createElement(isSidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar,
      })}
    </StyledHeader>
  );
};
