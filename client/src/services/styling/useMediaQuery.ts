import { useMedia } from 'react-use';

import { BreakpointKey, down, up } from './breakpoints';

const queries = { down, up };

/**
 * Returns boolean that indicates if provided media query is met.
 * @param queryType Type of the query to check.
 * @param key Breakpoint key.
 */
export const useMediaQuery = (queryType: keyof typeof queries, key: BreakpointKey) =>
  useMedia(queries[queryType](key).replace('@media ', ''));
