import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { PositionScope } from '@/typings/graphql';
import { selectToFormikSelect } from '@/utils/forms';

type Option = { value: PositionScope; label: string };

export type PositionScopeSelectProps = SelectProps<PositionScope | undefined>;

const options: Option[] = [
  { value: PositionScope.Guild, label: 'Guild' },
  { value: PositionScope.Organization, label: 'Organization' },
  { value: PositionScope.Squad, label: 'Squad' },
];

export const PositionScopeSelect: CFC<PositionScopeSelectProps> = props => {
  return <Select {...props} options={options} />;
};

export const FormikPositionScopeSelect = selectToFormikSelect(PositionScopeSelect);
