import styled from '@emotion/styled';
import { Card as AntCard } from 'antd';
import { CardProps as AntCardProps } from 'antd/lib/card';
import { omit, without } from 'lodash';
import {
  border,
  BorderProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  margin,
  padding,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  SpaceProps,
} from 'styled-system';

import { omitProps } from '@/utils/styling';

export type CardProps = AntCardProps &
  SpaceProps &
  LayoutProps &
  FlexboxProps &
  ShadowProps &
  PositionProps &
  BorderProps;

const mainCardSystem = compose(margin, shadow, border);
const cardBodySystem = compose(padding, flexbox, position);
const splitSystem = layout;
const styledSystemPropNames = [...mainCardSystem.propNames, ...cardBodySystem.propNames, ...splitSystem.propNames];

const shouldForwardProp = omitProps(without(styledSystemPropNames, 'size'));

export const Card = styled(AntCard, { shouldForwardProp })<CardProps>(props => {
  const { display, ...layoutProps } = omit(splitSystem(props), ['size']);

  return {
    ...layoutProps,
    ...mainCardSystem(props),
    borderRadius: 4,

    '.ant-card-body': {
      display,
      padding: 0,
      ...cardBodySystem(props),
    },

    '.ant-card-cover': {
      overflow: 'hidden',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
  };
});

export const CardMeta = AntCard.Meta;
