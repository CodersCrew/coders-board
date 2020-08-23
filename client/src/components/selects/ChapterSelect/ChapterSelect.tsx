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

  return <Select {...props} loading={loading} options={options} optionFilterProp="label" />;
};

export const FormikChapterSelect = selectToFormikSelect(ChapterSelect);
