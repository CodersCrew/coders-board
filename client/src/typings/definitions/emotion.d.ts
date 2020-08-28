import '@emotion/react';

import { ConfigTheme } from '@/services/styling';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ConfigTheme {}
}
