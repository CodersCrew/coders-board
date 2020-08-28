import { useMedia } from 'react-use';

import { BreakpointKey, down, up } from './breakpoints';

const queries = { down, up };

export const useMediaQuery = (key: keyof typeof queries, value: BreakpointKey) =>
  useMedia(queries[key](value).replace('@media ', ''));
