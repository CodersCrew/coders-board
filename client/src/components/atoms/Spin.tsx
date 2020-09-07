import styled from '@emotion/styled';
import { Spin as AntSpin } from 'antd';
import { SpinProps as AntSpinProps } from 'antd/lib/spin';
import { without } from 'lodash-es';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type SpinProps = AntSpinProps & SpaceProps & LayoutProps;

const styledSystem = compose(space, layout);

const shouldForwardProp = omitProps(without(styledSystem.propNames, 'size'));

export const Spin = styled(AntSpin, { shouldForwardProp })<SpinProps>(styledSystem);
