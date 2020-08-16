import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Typography as AntTypography } from 'antd';
import { ParagraphProps as AntParagraphProps } from 'antd/lib/typography/Paragraph';
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

import { omitProps } from '@/utils/styling';

type StyledSystemProps = SpaceProps & LayoutProps & TypographyProps & ColorProps;

type WithTextSize = {
  small?: boolean;
  large?: boolean;
};

export type ParagraphProps = AntParagraphProps &
  StyledSystemProps &
  WithTextSize & {
    whiteSpace?: CSSProperties['whiteSpace'];
  };

const styledSystem = compose(space, layout, typography, color);

const shouldForwardProp = omitProps([...styledSystem.propNames, 'whiteSpace']);

const StyledParagraph = styled(AntTypography.Paragraph, { shouldForwardProp })<Omit<ParagraphProps, 'large' | 'small'>>(
  props => {
    const { theme } = props;
    const { fontSizes, lineHeights, fontWeights, fonts } = theme;

    return {
      fontFamily: fonts.main,
      fontSize: fontSizes.normal,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,

      '&.ant-typography': {
        marginBottom: 'unset',
        whiteSpace: props.whiteSpace,
        ...styledSystem(props),
      },

      '&.small': {
        fontSize: fontSizes.small,
        lineHeight: lineHeights.small,
      },

      '&.large': {
        fontSize: fontSizes.large,
        lineHeight: lineHeights.large,
      },

      '.ant-typography-expand, .ant-typography-edit, .ant-typography-copy': {
        color: theme.colors.primary.main,
      },
    };
  },
);

export const Paragraph = ({ small, large, ...props }: ParagraphProps) => {
  const className = clsx(props.className, { small }, { large });

  return <StyledParagraph {...props} className={className} />;
};
