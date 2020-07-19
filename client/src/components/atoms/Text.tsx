import React from 'react';
import styled from '@emotion/styled';
import { Typography as AntTypography } from 'antd';
import { TextProps as AntTextProps } from 'antd/lib/typography/Text';
import clsx from 'clsx';
import {
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

type StyledSystemProps = SpaceProps & LayoutProps & TypographyProps & ColorProps;

type WithTextSize = {
  small?: boolean;
  large?: boolean;
};

export type TextProps = AntTextProps & StyledSystemProps & WithTextSize;

const styledSystem = compose(space, layout, typography, color);

const StyledText = styled(AntTypography.Text)(props => {
  const { theme } = props;
  const { fontSizes, lineHeights, fontWeights, fonts } = theme;

  return {
    ...styledSystem(props),
    fontFamily: fonts.main,
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,

    '&.small': {
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
    },

    '&.large': {
      fontSize: fontSizes.large,
      lineHeight: lineHeights.large,
    },
  };
});

export const Text = ({ small, large, ...props }: TextProps) => {
  const className = clsx(props.className, { small }, { large });

  return <StyledText {...props} className={className} />;
};
