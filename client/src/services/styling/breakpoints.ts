import { breakpoints } from './theme';

/**
 * One of the available breakpoints.
 */
export type BreakpointKey = keyof typeof breakpoints;

/**
 * Cerates media query where (max-width: x).
 * @param x Breakpoint to use in media query.
 */
export const down = (x: BreakpointKey) => `@media (max-width: ${breakpoints[x]})`;

/**
 * Cerates media query where (min-width: x).
 * @param x Breakpoint to use in media query.
 */
export const up = (x: BreakpointKey) => `@media (min-width: ${breakpoints[x]})`;

/**
 * Cerates media query where (min-width: x) and (max-width: y).
 * @param x Breakpoint for the minimal value.
 * @param y Breakpoint for the maximal value.
 */
export const between = (x: BreakpointKey, y: BreakpointKey) =>
  `@media (min-width: ${breakpoints[x]}) and (max-width: ${breakpoints[y]})`;
