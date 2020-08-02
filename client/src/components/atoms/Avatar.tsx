import styled from '@emotion/styled';
import { Avatar as AntAvatar } from 'antd';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import { compose, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/utils/styling';

export type AvatarProps = AntAvatarProps & SpaceProps;

const styledSystem = compose(space);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Avatar = styled(AntAvatar, { shouldForwardProp })<AvatarProps>(styledSystem);
