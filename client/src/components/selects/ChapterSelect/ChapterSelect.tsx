import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

import { useChapterSelectChaptersQuery } from './ChapterSelect.apollo';

type ValueType = string | undefined;

export type ChapterSelectProps = SelectProps<ValueType> & {
  squadId: string;
};

export const ChapterSelect: CFC<ChapterSelectProps> = ({ squadId, ...props }) => {
  const { data, loading } = useChapterSelectChaptersQuery({ variables: { squadId } });

  const options = data?.chapters.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  const handleChange: SelectProps<ValueType>['onChange'] = value => {
    if (typeof value === 'undefined' && props.onSelect) {
      props.onSelect(undefined, { value: undefined, options });
    }
  };

  return <Select {...props} loading={loading} onChange={handleChange} options={options} optionFilterProp="label" />;
};

export const FormikChapterSelect = selectToFormikSelect(ChapterSelect);
