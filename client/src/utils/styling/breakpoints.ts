import * as sb from 'styled-breakpoints';

import { breakpoints } from '@/config/theme';

type BreakpointKey = keyof typeof breakpoints;

export const down = (x: BreakpointKey) => sb.down(x)({ theme: { breakpoints } });

export const up = (x: BreakpointKey) => sb.up(x)({ theme: { breakpoints } });

export const only = (x: BreakpointKey) => sb.only(x)({ theme: { breakpoints } });

export const between = (x: BreakpointKey, y: BreakpointKey) => sb.between(x, y)({ theme: { breakpoints } });
