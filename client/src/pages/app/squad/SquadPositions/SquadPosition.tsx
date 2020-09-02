import React from 'react';
import { Avatar, List } from 'antd';

import { Button } from '@/components/atoms';
import { UseSquadPositions } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { formatDate } from '@/utils/dates';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';
import { SquadPositionModalData } from './SquadPositionModal';
import { useDeleteSquadPositionConfirm } from './useDeleteSquadPositionConfirm';

type SquadPositionProps = UseSquadPositions['item'] & {
  openModal: (data: SquadPositionModalData) => void;
  closeModal: () => void;
};

const format = formatDate('MMMM yyyy');

export const SquadPosition: CFC<SquadPositionProps> = props => {
  const { squadRole } = useSquadContext();

  const deleteSquadPositionConfirm = useDeleteSquadPositionConfirm({
    id: props.id,
    positionName: props.position.name,
  });

  const openUpdateModal = () => {
    props.openModal({
      ...pick(props, ['id', 'from', 'to', 'notes']),
      memberId: props.member.id,
      chapterId: props.chapter?.id,
      positionId: props.position.id,
    });
  };

  const positionName = props.chapter ? `${props.position.name} in ${props.chapter.name} chapter` : props.position.name;

  return (
    <List.Item
      actions={
        squadRole && !props.member.deletedAt
          ? [
              <Button key="update" type="link" onClick={openUpdateModal}>
                Update
              </Button>,
              <Button key="delete" danger type="link" onClick={deleteSquadPositionConfirm}>
                Delete
              </Button>,
            ]
          : []
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={props.member.user.image} />}
        title={positionName}
        description={props.member.user.fullName}
      />
      <div>
        {format(props.from)} - {props.to ? format(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
