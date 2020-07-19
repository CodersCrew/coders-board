import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    space: (string | number)[];
    colors: {
      primary: {
        dark: string;
        main: string;
        light: string;
        border: string;
        background: string;
      };
      info: {
        dark: string;
        main: string;
        light: string;
        border: string;
        background: string;
      };
      success: {
        dark: string;
        main: string;
        light: string;
        border: string;
        background: string;
      };
      warning: {
        dark: string;
        main: string;
        light: string;
        border: string;
        background: string;
      };
      error: {
        dark: string;
        main: string;
        light: string;
        border: string;
        background: string;
      };
      background: {
        base: string;
        light: string;
        body: string;
        component: string;
      };
      border: {
        base: string;
        split: string;
      };
      text: {
        title: string;
        primary: string;
        secondary: string;
        disabled: string;
        white: string;
      };
      common: {
        black: string;
        white: string;
      };
    };
    fonts: {
      main: string;
      code: string;
    };
    fontSizes: {
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      large: number;
      normal: number;
      small: number;
    };
    lineHeights: {
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      large: number;
      normal: number;
      small: number;
    };
    fontWeights: {
      normal: number;
      bold: number;
    };
    shadows: {};
    radii: {
      small: number;
    };
    breakpoints: {
      default: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
