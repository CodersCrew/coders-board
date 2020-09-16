import React from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import styled from '@emotion/styled';
import { color, ColorProps, compose, fontSize, FontSizeProps, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';
import { CFC, RFC } from '@/typings/components';

export type IconProps = AntdIconProps &
  SpaceProps &
  FontSizeProps &
  ColorProps & {
    icon: RFC<AntdIconProps>;
  };

const styledSystem = compose(space, color, fontSize);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Icon: CFC<IconProps> = ({ icon, ...props }) => {
  const StyledIcon = styled(icon, { shouldForwardProp })(p => ({
    '&.anticon[role="img"][aria-label]': styledSystem(p),
  })) as CFC<Omit<IconProps, 'icon'>>;

  return <StyledIcon {...props} />;
};
