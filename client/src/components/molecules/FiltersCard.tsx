import React, { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { SearchProps as AntSearchProps } from 'antd/lib/input';
import { debounce } from 'lodash-es';

import { CFC } from '@/typings/components';

import { Box, Button } from '../atoms';
import { Card } from './Card';

type SearchProps = {
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
  search?: SearchProps | false;
  addButton?: AddButtonProps | false;
  leftNode?: ReactNode;
};

const Search: CFC<SearchProps> = ({ value, onSearch, ...props }) => {
  const debouncedOnSearch = debounce(onSearch, 200);

  const handleChange: AntSearchProps['onChange'] = e => {
    debouncedOnSearch(e.target.value);
  };

  return (
    <Box width={240}>
      <Input.Search placeholder="Search..." defaultValue={value} onChange={handleChange} allowClear {...props} />
    </Box>
  );
};

const AddButton: CFC<AddButtonProps> = ({ label, onClick, visible }) => {
  if (visible === false) return null;

  return (
    <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export const FiltersCard: CFC<FiltersCardProps> = ({ addButton, search, leftNode }) => {
  if ((!addButton || addButton.visible === false) && !search) return null;

  return (
    <Card p={24} display="flex" mb={24}>
      {search && <Search {...search} />}
      {leftNode}
      {addButton && <AddButton {...addButton} />}
    </Card>
  );
};
