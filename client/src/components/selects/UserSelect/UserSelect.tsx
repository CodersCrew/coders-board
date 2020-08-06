import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { useUserSelectUsersQuery } from './UserSelect.apollo';

type ValueType = string | undefined;

export type UserSelectProps = SelectProps<ValueType> & {
  idsToOmit?: string[];
  ids?: string[];
  idMapper?: Record<string, string>;
};

export const UserSelect: CFC<UserSelectProps> = ({ idsToOmit, ids, idMapper, ...props }) => {
  const { data, loading } = useUserSelectUsersQuery({ variables: { ids } });

  let options =
    data?.users.map(({ id, fullName }) => ({
      label: fullName,
      value: idMapper ? idMapper[id] : id,
    })) || [];

  if (idsToOmit) {
    options = options.filter(({ value }) => !idsToOmit.includes(value));
  }

  const handleChange: SelectProps<ValueType>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} loading={loading} onChange={handleChange} options={options} optionFilterProp="label" />;
};

export const FormikUserSelect = selectToFormikSelect(UserSelect);
