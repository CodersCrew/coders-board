import styled from '@emotion/styled';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox';
import { without } from 'lodash-es';
import { compose, space, SpaceProps } from 'styled-system';

import { omitProps } from '@/services/styling';

export type CheckboxProps = AntCheckboxProps & SpaceProps;

const styledSystem = compose(space);

const shouldForwardProp = omitProps(without(styledSystem.propNames, 'size'));

export const Checkbox = styled(AntCheckbox, { shouldForwardProp })<CheckboxProps>(styledSystem);
