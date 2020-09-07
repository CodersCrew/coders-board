import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { FC } from '@/typings/components';

import { GlobalStyles } from './GlobalStyles';
import { theme } from './theme';

export const ThemeProvider: FC = ({ children }) => (
  <EmotionThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
);
