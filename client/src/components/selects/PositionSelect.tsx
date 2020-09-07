import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { UseSimplePositions, useSimplePositions } from '@/graphql/positions';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type PositionSelectProps = SelectProps<ValueType> & Pick<UseSimplePositions['variables'], 'scopes'>;

export const PositionSelect: CFC<PositionSelectProps> = ({ scopes = [], ...props }) => {
  const simplePositions = useSimplePositions({ scopes });

  const options = simplePositions.data.map(({ id, name }) => ({ label: name, value: id })) || [];

  return <Select {...props} loading={simplePositions.loading} options={options} optionFilterProp="label" />;
};

export const FormikPositionSelect = selectToFormikSelect(PositionSelect);
