import React from 'react';
import { css, Global } from '@emotion/react';

import { normalizeCSS } from './normalizeCSS';

export const GlobalStyles = () => {
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
      `}
    />
  );
};
