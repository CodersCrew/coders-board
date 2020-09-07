import styled from '@emotion/styled';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import { compose, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type ButtonProps = AntButtonProps & SpaceProps;

const styledSystem = compose(space);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Button = styled(AntButton, { shouldForwardProp })<ButtonProps>(styledSystem);
