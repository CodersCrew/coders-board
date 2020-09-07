import styled from '@emotion/styled';
import { Typography as AntTypography } from 'antd';
import { TitleProps as AntTitleProps } from 'antd/lib/typography/Title';
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

export type TitleProps = AntTitleProps & SpaceProps & LayoutProps & TypographyProps & ColorProps;

const styledSystem = compose(space, layout, typography, color);

export const Title = styled(AntTypography.Title)<TitleProps>(props => {
  const { fontSizes, lineHeights, fontWeights, fonts, colors } = props.theme;

  const shared = {
    marginBottom: 'unset',
    marginTop: 'unset',
    color: colors.text.title,
    ...styledSystem(props),
  };

  return {
    '&.ant-typography': {
      fontFamily: fonts.main,

      'h1&': {
        ...shared,
        fontSize: fontSizes.h1,
        lineHeight: lineHeights.h1,
        fontWeight: fontWeights.bold,
      },

      'h2&': {
        ...shared,
        fontSize: fontSizes.h2,
        lineHeight: lineHeights.h2,
        fontWeight: fontWeights.bold,
      },

      'h3&': {
        ...shared,
        fontSize: fontSizes.h3,
        lineHeight: lineHeights.h3,
        fontWeight: fontWeights.bold,
      },

      'h4&': {
        ...shared,
        fontSize: fontSizes.h4,
        lineHeight: lineHeights.h4,
        fontWeight: fontWeights.bold,
      },
    },
  };
});
