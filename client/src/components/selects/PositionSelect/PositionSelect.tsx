import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { usePositionSelectPositionsQuery } from './PositionSelect.apollo';

type ValueType = string | undefined;

export type PositionSelectProps = SelectProps<ValueType>;

export const PositionSelect: CFC<PositionSelectProps> = props => {
  const { data, loading } = usePositionSelectPositionsQuery();

  const options = data?.positions.map(({ id, name }) => ({ label: name, value: id })) || [];

  return <Select {...props} loading={loading} options={options} optionFilterProp="label" />;
};

export const FormikPositionSelect = selectToFormikSelect(PositionSelect);
