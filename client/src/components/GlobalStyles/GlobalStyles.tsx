import React from 'react';
import { css, Global, useTheme } from '@emotion/react';
import { lighten } from 'polished';

import { normalizeCSS } from './normalizeCSS';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        ${normalizeCSS}

        .ant-table-cell {
          vertical-align: top;
        }

        .ant-dropdown-menu-item {
          display: flex;
          align-items: center;
        }

        .ant-layout-sider.ant-layout-sider-dark,
        .ant-menu.ant-menu-dark {
          background: ${theme.colors.background.dark};
        }

        .ant-menu-dark .ant-menu-item:hover,
        .ant-dropdown-menu-dark {
          background: ${lighten(0.1, theme.colors.background.dark)};
        }

        .ant-list-item-meta-content > .ant-list-item-meta-title {
          margin-bottom: 4px;
        }
      `}
    />
  );
};
