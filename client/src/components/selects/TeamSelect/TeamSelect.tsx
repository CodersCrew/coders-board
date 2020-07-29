import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { useField } from 'formik';

import { useTeamSelectTeamsQuery } from './TeamSelect.apollo';
import { CFC } from '@/typings/components';

type ValueType = string | undefined;

export type TeamSelectProps = SelectProps<ValueType>;

export const TeamSelect: CFC<TeamSelectProps> = props => {
  const { data, loading } = useTeamSelectTeamsQuery();

  const options = data?.teams.map(({ id, name, kind }) => ({ label: `${name} (${kind})`, value: id })) || [];

  const handleChange: SelectProps<ValueType>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} loading={loading} onChange={handleChange} options={options} optionFilterProp="label" />;
};

export const FormikTeamSelect: CFC<TeamSelectProps & { name: string }> = ({ name, ...props }) => {
  const [field, , helpers] = useField<ValueType>(name);

  return <TeamSelect onSelect={v => helpers.setValue(v)} onBlur={field.onBlur} value={field.value} {...props} />;
};
