import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { GuildPositionKind } from '@/typings/graphql';
import { selectToFormikSelect } from '@/utils/forms';
import { parseGuildPositionKind } from '@/utils/platform';

type Option = { value: GuildPositionKind; label: string };

export type GuildPositionKindSelectProps = SelectProps<GuildPositionKind | undefined>;

const options: Option[] = Object.values(GuildPositionKind).map(kind => ({
  label: parseGuildPositionKind(kind),
  value: kind,
}));

export const GuildPositionKindSelect: CFC<GuildPositionKindSelectProps> = props => {
  return <Select {...props} options={options} />;
};

export const FormikGuildPositionKindSelect = selectToFormikSelect(GuildPositionKindSelect);
