import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { useSimpleUsers } from '@/graphql/users';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type UserSelectProps = SelectProps<ValueType> & {
  idsToOmit?: string[];
  ids?: string[];
  idMapper?: Record<string, string>;
};

export const UserSelect: CFC<UserSelectProps> = ({ idsToOmit, ids, idMapper, ...props }) => {
  const simpleUsers = useSimpleUsers({ ids });

  let options =
    simpleUsers.data.map(({ id, fullName }) => ({
      label: fullName,
      value: idMapper ? idMapper[id] : id,
    })) || [];

  if (idsToOmit) {
    options = options.filter(({ value }) => !idsToOmit.includes(value));
  }

  return <Select {...props} loading={simpleUsers.loading} options={options} optionFilterProp="label" />;
};

export const FormikUserSelect = selectToFormikSelect(UserSelect);
