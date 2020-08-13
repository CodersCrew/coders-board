import '@emotion/react';

import { ConfigTheme } from '@/config/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ConfigTheme {}
}
