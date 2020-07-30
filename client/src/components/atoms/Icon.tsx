import React from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import styled from '@emotion/styled';
import { color, ColorProps, compose, fontSize, FontSizeProps, space, SpaceProps } from 'styled-system';

import { CFC, RFC } from '@/typings/components';
import { omitProps } from '@/utils/styling';

type IconProps = AntdIconProps &
  SpaceProps &
  FontSizeProps &
  ColorProps & {
    icon: RFC<AntdIconProps>;
  };

const styledSystem = compose(space, color, fontSize);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Icon: CFC<IconProps> = ({ icon, ...props }) => {
  const StyledIcon = styled(icon, { shouldForwardProp })(p => ({
    '&.anticon[role="img"]': styledSystem(p),
  }));

  return <StyledIcon {...props} />;
};
