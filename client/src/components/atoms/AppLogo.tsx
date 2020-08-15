import { HTMLProps } from 'react';
import styled from '@emotion/styled';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/utils/styling';

export type AppLogoProps = Omit<HTMLProps<HTMLImageElement>, 'src'> & SpaceProps & LayoutProps;

const styledSystem = compose(space, layout);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const AppLogo = styled('img', { shouldForwardProp })<AppLogoProps>(styledSystem);

AppLogo.defaultProps = {
  src: '/logo-long.svg',
};
