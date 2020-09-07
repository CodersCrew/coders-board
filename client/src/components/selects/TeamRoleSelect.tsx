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
  return <Select {...props} options={options} />;
};

export const FormikTeamRoleSelect = selectToFormikSelect(TeamRoleSelect);
