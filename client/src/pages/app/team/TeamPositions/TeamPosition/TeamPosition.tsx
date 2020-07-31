import React from 'react';
import { Avatar, List } from 'antd';
import { pick } from 'lodash';
import moment, { Moment } from 'moment';

import { Button } from '@/components/atoms';
import { CFC } from '@/typings/components';

import { PositionItem, TeamPositionModalState } from '../TeamPositions.types';
import { useDeleteTeamPositionConfirm } from './useDeleteTeamPositionConfirm';

type TeamPositionProps = PositionItem & {
  openModal: (data: TeamPositionModalState) => void;
  closeModal: () => void;
};

const formaDate = (date: Moment) => moment(date).format('MMMM YYYY');

export const TeamPosition: CFC<TeamPositionProps> = props => {
  const { deleteTeamPositionConfirm } = useDeleteTeamPositionConfirm(pick(props, ['id', 'positionName']));

  const openUpdateModal = () => {
    props.openModal(pick(props, ['id', 'from', 'to', 'notes', 'positionId', 'teamMemberId']));
  };

  return (
    <List.Item
      actions={[
        <Button key="update" type="link" onClick={openUpdateModal}>
          Update
        </Button>,
        <Button key="delete" danger type="link" onClick={deleteTeamPositionConfirm}>
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={props.userImage} />}
        title={props.positionName}
        description={props.userName}
      />
      <div>
        {formaDate(props.from)} - {props.to ? formaDate(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
