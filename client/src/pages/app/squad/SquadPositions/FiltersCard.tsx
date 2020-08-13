import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { Box, Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { CFC } from '@/typings/components';

import { useSquadContext } from '../SquadContext';

type FiltersCardProps = {
  onSearch: (value: string) => void;
  search: string;
  openModal: () => void;
};

export const FiltersCard: CFC<FiltersCardProps> = ({ search, onSearch, openModal }) => {
  const { squadRole } = useSquadContext();

  return (
    <Card p={24} display="flex">
      <Box width={240}>
        <Input.Search placeholder="Search..." onSearch={onSearch} defaultValue={search} />
      </Box>
      {squadRole.isManager && (
        <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => openModal()}>
          Add position
        </Button>
      )}
    </Card>
  );
};
