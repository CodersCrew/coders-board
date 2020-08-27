import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { useSimpleChapters } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { selectToFormikSelect } from '@/utils/forms';

type ValueType = string | undefined;

export type ChapterSelectProps = SelectProps<ValueType> & {
  squadId: string;
};

export const ChapterSelect: CFC<ChapterSelectProps> = ({ squadId, ...props }) => {
  const simpleChapters = useSimpleChapters({ squadId });

  const options = simpleChapters.data.map(({ id, name }) => ({ label: name, value: id })) ?? [];

  return <Select {...props} loading={simpleChapters.loading} options={options} optionFilterProp="label" />;
};

export const FormikChapterSelect = selectToFormikSelect(ChapterSelect);
