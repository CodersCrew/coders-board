import React, { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { pick } from '@/utils/objects';

import { Box, Button } from '../atoms';
import { Card } from './Card';

type Search = {
  onSearch: (value: string) => void;
  value: string;
  loading?: boolean;
  autoFocus?: boolean;
};

type AddButtonProps = {
  onClick: () => void;
  label: string;
  visible?: boolean;
};

export type FiltersCardProps = {
  search?: Search | false;
  addButton?: AddButtonProps | false;
  leftNode?: ReactNode;
};

export const FiltersCard = ({ addButton, search, leftNode }: FiltersCardProps) => {
  if ((!addButton || !addButton.visible) && !search) return null;

  return (
    <Card p={24} display="flex" mb={24}>
      {search && (
        <Box width={240}>
          <Input.Search
            placeholder="Search..."
            defaultValue={search.value}
            allowClear
            {...pick(search, ['onSearch', 'autoFocus', 'loading'])}
          />
        </Box>
      )}
      {leftNode}
      {addButton && addButton.visible && (
        <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => addButton.onClick()}>
          {addButton.label}
        </Button>
      )}
    </Card>
  );
};
