import styled from '@emotion/styled';
import { Tag as AntTag } from 'antd';
import { TagProps as AntTagProps } from 'antd/lib/tag';
import { transparentize } from 'polished';
import { compose, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type TagProps = AntTagProps &
  SpaceProps & {
    outlined?: boolean;
  };

const styledSystem = compose(space);

const shouldForwardProp = omitProps([...styledSystem.propNames, 'outlined']);

export const Tag = styled(AntTag, { shouldForwardProp })<TagProps>(props => {
  const outlinedProps = props.outlined
    ? {
        color: props.color,
        backgroundColor: `${transparentize(0.9, props.color as string)} !important`,
        border: `1px solid ${props.color}`,
      }
    : {};

  return {
    '&.ant-tag': {
      ...styledSystem(props),
      ...outlinedProps,
    },
  };
});
