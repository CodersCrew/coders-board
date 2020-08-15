import React, { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { Box, Button } from '../atoms';
import { Card } from './Card';

type Search = {
  onSearch: (value: string) => void;
  value: string;
  loading?: boolean;
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
  if (!addButton && !search) return null;

  return (
    <Card p={24} display="flex" mb={24}>
      {search && (
        <Box width={240}>
          <Input.Search placeholder="Search..." onSearch={search.onSearch} defaultValue={search.value} />
        </Box>
      )}
      {leftNode}
      {addButton && (
        <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => addButton.onClick()}>
          {addButton.label}
        </Button>
      )}
    </Card>
  );
};
