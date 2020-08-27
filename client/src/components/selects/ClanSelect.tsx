import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { useSimpleClans } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type ClanSelectProps = SelectProps<ValueType> & {
  guildId: string;
};

export const ClanSelect: CFC<ClanSelectProps> = ({ guildId, ...props }) => {
  const simpleClans = useSimpleClans({ guildId });

  const options = simpleClans.data.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  return <Select {...props} loading={simpleClans.loading} options={options} optionFilterProp="label" />;
};

export const FormikClanSelect = selectToFormikSelect(ClanSelect);
