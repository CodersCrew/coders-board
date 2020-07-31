import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { TeamRole } from '@/typings/graphql';
import { selectToFormikSelect } from '@/utils/forms';

type Option = { value: TeamRole; label: string };

export type TeamRoleSelectProps = SelectProps<TeamRole | undefined>;

const options: Option[] = Object.values(TeamRole).map(role => ({ label: role, value: role }));

export const TeamRoleSelect: CFC<TeamRoleSelectProps> = props => {
  const handleChange: SelectProps<TeamRole | undefined>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} onChange={handleChange} options={options} />;
};

export const FormikTeamRoleSelect = selectToFormikSelect(TeamRoleSelect);
