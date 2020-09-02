import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { color, ColorProps, compose, space, SpaceProps, typography, TypographyProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type LinkProps = RouterLinkProps & SpaceProps & ColorProps & TypographyProps;

const styledSystem = compose(space, color, typography);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Link = styled(RouterLink, { shouldForwardProp })(styledSystem);
