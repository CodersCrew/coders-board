import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, List, Menu } from 'antd';

import { Button, Icon } from '@/components/atoms';
import { UseChapters } from '@/graphql/squads';
import { pick } from '@/utils/objects';

import { ChapterContent } from './ChapterContent';
import { SquadChapterModalProps } from './SquadChapterModal';
import { useDeleteChapterConfirm } from './useDeleteChapterConfirm';

export type ChapterProps = {
  chapter: UseChapters['item'];
  openModal: (data: SquadChapterModalProps['data']) => void;
};

const Chapter = ({ chapter, openModal }: ChapterProps) => {
  const deleteChapterConfirm = useDeleteChapterConfirm();

  const overlay = (
    <Menu>
      <Menu.Item onClick={() => openModal(pick(chapter, ['id', 'name', 'description', 'email']))}>
        Edit chapter
      </Menu.Item>
      <Menu.Item danger onClick={() => deleteChapterConfirm(pick(chapter, ['id', 'name']))}>
        Delete chapter
      </Menu.Item>
    </Menu>
  );

  const dropdownActions = (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
    </Dropdown>
  );

  return (
    <List.Item extra={dropdownActions}>
      <List.Item.Meta
        title={chapter.name}
        description={
          chapter.description || 'This chapter contains no description. Add one to make it purpose more explicit.'
        }
      />
      <ChapterContent chapter={chapter} />
    </List.Item>
  );
};

export default Chapter;
