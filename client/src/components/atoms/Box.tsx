import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
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

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps &
  FlexboxProps &
  ShadowProps &
  GridProps;

export const Box = styled('div', { shouldForwardProp })<BoxProps>(
  compose(space, color, layout, border, typography, flexbox, shadow, grid, position, background),
);
