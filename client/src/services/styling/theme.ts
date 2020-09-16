import { transparentize } from 'polished';

const colors = {
  primary: {
    dark: '#2b7cd9',
    main: '#409eff',
    light: '#69b9ff',
    border: '#bae3ff',
    background: '#f0faff',
  },
  info: {
    dark: '#08979c',
    main: '#13c2c2',
    light: '#36cfc9',
    border: '#87e8de',
    background: '#e6fffb',
  },
  success: {
    dark: '#389e0d',
    main: '#52c41a',
    light: '#73d13d',
    border: '#b7eb8f',
    background: '#f6ffed',
  },
  warning: {
    dark: '#d48806',
    main: '#faad14',
    light: '#ffc53d',
    border: '#ffe58f',
    background: '#fffbe6',
  },
  error: {
    dark: '#cf1322',
    main: '#f5222d',
    light: '#ff4d4f',
    border: '#ffa39e',
    background: '#fff1f0',
  },
  background: {
    base: transparentize(0.96, '#000'),
    dark: '#111',
    light: transparentize(0.98, '#000'),
    body: '#f0f2f5',
    component: '#fff',
  },
  border: {
    base: transparentize(0.85, '#000'),
    split: transparentize(0.91, '#000'),
  },
  text: {
    title: transparentize(0.15, '#000'),
    primary: transparentize(0.35, '#000'),
    secondary: transparentize(0.55, '#000'),
    disabled: transparentize(0.75, '#000'),
    white: '#fff',
  },
  gray: {
    13: '#000000',
    12: '#141414',
    11: '#1f1f1f',
    10: '#262626',
    9: '#434343',
    8: '#595959',
    7: '#8c8c8c',
    6: '#bfbfbf',
    5: '#d9d9d9',
    4: '#f0f0f0',
    3: '#f5f5f5',
    2: '#fafafa',
    1: '#ffffff',
  },
  successes: {
    epic: '#722ed1',
    small: '#13c2c2',
    news: '#7cb305',
  },
};

const fonts = {
  main:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  code: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
};

const fontSizes = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 16,
  large: 16,
  normal: 14,
  small: 12,
};

const lineHeights = {
  h1: '32px',
  h2: '28px',
  h3: '24px',
  h4: '20px',
  large: '20px',
  normal: '20px',
  small: '16px',
};

const fontWeights = {
  normal: 400,
  bold: 600,
};

const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  card: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
};

const radii = {
  small: 4,
};

export const breakpoints = {
  default: '0px',
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const theme = {
  space: [] as (string | number)[],
  colors,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  shadows,
  radii,
  breakpoints,
};

export type ConfigTheme = typeof theme;
