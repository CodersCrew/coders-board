import styled from '@emotion/styled';
import {
  background,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

import { omitProps } from '@/services/styling';

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps &
  FlexboxProps &
  ShadowProps &
  GridProps;

const styledSystem = compose(space, color, layout, border, typography, flexbox, shadow, grid, position, background);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Box = styled('div', { shouldForwardProp })<BoxProps>(styledSystem);
