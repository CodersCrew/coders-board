import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { useSimpleGuilds } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type GuildSelectProps = SelectProps<ValueType>;

export const GuildSelect: CFC<GuildSelectProps> = props => {
  const simpleGuilds = useSimpleGuilds();

  const options = simpleGuilds.data.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  return <Select {...props} loading={simpleGuilds.loading} options={options} optionFilterProp="label" />;
};

export const FormikGuildSelect = selectToFormikSelect(GuildSelect);
