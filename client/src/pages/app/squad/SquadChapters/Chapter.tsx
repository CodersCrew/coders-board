import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { ActionsDropdown, DropdownAction } from '@/components/molecules';
import { UseChapters } from '@/graphql/squads';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';
import { ChapterContent } from './ChapterContent';
import { SquadChapterModalData } from './SquadChapterModal';
import { useDeleteChapterConfirm } from './useDeleteChapterConfirm';

export type ChapterProps = {
  chapter: UseChapters['item'];
  openModal: (data: SquadChapterModalData) => void;
};

const Chapter = ({ chapter, openModal }: ChapterProps) => {
  const { squadRole } = useSquadContext();
  const deleteChapterConfirm = useDeleteChapterConfirm();

  const actions: DropdownAction[] = [
    {
      label: 'Edit chapter',
      icon: EditOutlined,
      visible: squadRole.isManager,
      onClick: () => openModal(pick(chapter, ['id', 'name', 'description'])),
    },
    {
      label: 'Delete chapter',
      icon: DeleteOutlined,
      visible: squadRole.isOwner,
      onClick: () => deleteChapterConfirm(pick(chapter, ['id', 'name'])),
    },
  ];

  return (
    <List.Item extra={<ActionsDropdown actions={actions} />}>
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
