import styled from '@emotion/styled';
import { Tag as AntTag } from 'antd';
import { TagProps as AntTagProps } from 'antd/lib/tag';
import { compose, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type TagProps = AntTagProps & SpaceProps;

const styledSystem = compose(space);

const shouldForwardProp = omitProps(styledSystem.propNames);

export const Tag = styled(AntTag, { shouldForwardProp })<TagProps>(props => ({
  '&.ant-tag': {
    ...styledSystem(props),
  },
}));
