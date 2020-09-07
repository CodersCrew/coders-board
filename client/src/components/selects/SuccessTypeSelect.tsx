import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { SuccessType } from '@/typings/graphql';
import { selectToFormikSelect } from '@/utils/forms';

type Option = { value: SuccessType; label: string };

export type SuccessTypeSelectProps = SelectProps<SuccessType | undefined>;

const options: Option[] = Object.values(SuccessType).map(role => ({ label: role, value: role }));

export const SuccessTypeSelect: CFC<SuccessTypeSelectProps> = props => {
  return <Select {...props} options={options} />;
};

export const FormikSuccessTypeSelect = selectToFormikSelect(SuccessTypeSelect);
