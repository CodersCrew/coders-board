import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { useClansSelectClansQuery } from './ClansSelect.apollo';

type ValueType = string | undefined;

export type ClansSelectProps = SelectProps<ValueType> & {
  guildId: string;
};

export const ClansSelect: CFC<ClansSelectProps> = ({ guildId, ...props }) => {
  const { data, loading } = useClansSelectClansQuery({ variables: { guildId } });

  const options = data?.clans.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  const handleChange: SelectProps<ValueType>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} loading={loading} onChange={handleChange} options={options} optionFilterProp="label" />;
};

export const FormikClansSelect = selectToFormikSelect(ClansSelect);
