import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { useSimplePositions } from '@/graphql/positions';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type PositionSelectProps = SelectProps<ValueType>;

export const PositionSelect: CFC<PositionSelectProps> = props => {
  const simplePositions = useSimplePositions();

  const options = simplePositions.data.map(({ id, name }) => ({ label: name, value: id })) || [];

  return <Select {...props} loading={simplePositions.loading} options={options} optionFilterProp="label" />;
};

export const FormikPositionSelect = selectToFormikSelect(PositionSelect);
