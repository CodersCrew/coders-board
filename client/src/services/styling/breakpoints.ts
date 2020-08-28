import { breakpoints } from './theme';

export type BreakpointKey = keyof typeof breakpoints;

export const down = (x: BreakpointKey) => `@media (max-width: ${breakpoints[x]})`;

export const up = (x: BreakpointKey) => `@media (min-width: ${breakpoints[x]})`;

export const between = (x: BreakpointKey, y: BreakpointKey) =>
  `@media (min-width: ${breakpoints[x]}) and (max-width: ${breakpoints[y]})`;
