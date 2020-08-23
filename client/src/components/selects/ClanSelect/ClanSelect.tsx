import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { useClanSelectClansQuery } from './ClanSelect.apollo';

type ValueType = string | undefined;

export type ClanSelectProps = SelectProps<ValueType> & {
  guildId: string;
};

export const ClanSelect: CFC<ClanSelectProps> = ({ guildId, ...props }) => {
  const { data, loading } = useClanSelectClansQuery({ variables: { guildId } });

  const options = data?.clans.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  return <Select {...props} loading={loading} options={options} optionFilterProp="label" />;
};

export const FormikClanSelect = selectToFormikSelect(ClanSelect);
