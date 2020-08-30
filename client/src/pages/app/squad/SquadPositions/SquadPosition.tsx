import React from 'react';
import { Avatar, List } from 'antd';
import { format } from 'date-fns';

import { Button } from '@/components/atoms';
import { UseSquadPositions } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';
import { SquadPositionModalData } from './SquadPositionModal';
import { useDeleteSquadPositionConfirm } from './useDeleteSquadPositionConfirm';

type SquadPositionProps = UseSquadPositions['item'] & {
  openModal: (data: SquadPositionModalData) => void;
  closeModal: () => void;
};

const formaDate = (date: Date) => format(date, 'MMMM yyyy');

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

  const positionName = props.chapter ? `${props.position.name} in ${props.chapter.name} Chapter` : props.position.name;

  return (
    <List.Item
      actions={
        squadRole
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
        {formaDate(props.from)} - {props.to ? formaDate(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
