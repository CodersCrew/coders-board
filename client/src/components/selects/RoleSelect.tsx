import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { UserRole } from '@/typings/graphql';
import { selectToFormikSelect } from '@/utils/forms';

type Option = { value: UserRole; label: string };

export type RoleSelectProps = SelectProps<UserRole | undefined>;

const options: Option[] = [
  { value: UserRole.Admin, label: 'Adminstrator' },
  { value: UserRole.User, label: 'User' },
];

export const RoleSelect: CFC<RoleSelectProps> = props => {
  const handleChange: SelectProps<UserRole | undefined>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} onChange={handleChange} options={options} />;
};

export const FormikRoleSelect = selectToFormikSelect(RoleSelect);
