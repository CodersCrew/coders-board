import styled from '@emotion/styled';
import { Avatar as AntAvatar } from 'antd';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type AvatarProps = Omit<AntAvatarProps, 'size'> & SpaceProps & LayoutProps;

const styledSystem = compose(space, layout);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Avatar = styled(AntAvatar, { shouldForwardProp })<AvatarProps>(props => ({
  '&.ant-avatar': {
    ...styledSystem(props),
    minWidth: props.width || props.size,
    minHeight: props.height || props.size,
  },
}));

export const AvatarGroup = AntAvatar.Group;
