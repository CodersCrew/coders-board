import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { Box, Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { useChapters } from '@/graphql/squads';
import { useDataModal } from '@/services/modals';

import { useSquadContext } from '../SquadContext';
import Chapter from './Chapter';
import { SquadChapterModal, SquadChapterModalData } from './SquadChapterModal';

const SquadChapters = () => {
  const { squadId, squadRole } = useSquadContext();
  const chapters = useChapters({ squadId });
  const chapterModal = useDataModal<SquadChapterModalData>();

  return (
    <>
      {squadRole.isManager && (
        <Box display="flex" justifyContent="flex-end" mb={24}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => chapterModal.open(null)}>
            Add chapter
          </Button>
        </Box>
      )}
      <Card bordered={false}>
        <List
          size="large"
          loading={chapters.loading}
          rowKey="id"
          itemLayout="vertical"
          dataSource={chapters.data}
          renderItem={item => <Chapter key={item.id} chapter={item} openModal={chapterModal.open} />}
        />
      </Card>
      <SquadChapterModal {...chapterModal} />
    </>
  );
};

export default SquadChapters;
