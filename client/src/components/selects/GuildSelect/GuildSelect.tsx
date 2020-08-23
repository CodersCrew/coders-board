import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { useGuildSelectGuildsQuery } from './GuildSelect.apollo';

type ValueType = string | undefined;

export type GuildSelectProps = SelectProps<ValueType>;

export const GuildSelect: CFC<GuildSelectProps> = props => {
  const { data, loading } = useGuildSelectGuildsQuery();

  const options = data?.guilds.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  return <Select {...props} loading={loading} options={options} optionFilterProp="label" />;
};

export const FormikGuildSelect = selectToFormikSelect(GuildSelect);
