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
  const handleChange: SelectProps<GuildPositionKind | undefined>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} onChange={handleChange} options={options} />;
};

export const FormikGuildPositionKindSelect = selectToFormikSelect(GuildPositionKindSelect);
