import React from 'react';
import { Avatar, List } from 'antd';

import { Button } from '@/components/atoms';
import { UseGuildPositions } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { formatDate } from '@/utils/dates';
import { pick } from '@/utils/objects';

import { useGuildContext } from '../GuildContext';
import { GuildPositionModalData } from './GuildPositionModal';
import { useDeleteGuildPositionConfirm } from './useDeleteGuildPositionConfirm';

type GuildPositionProps = UseGuildPositions['item'] & {
  openModal: (data: GuildPositionModalData) => void;
  closeModal: () => void;
};

const format = formatDate('MMMM yyyy');

export const GuildPosition: CFC<GuildPositionProps> = props => {
  const { guildRole } = useGuildContext();
  const deleteGuildPositionConfirm = useDeleteGuildPositionConfirm({ id: props.id, positionName: props.position.name });

  const openUpdateModal = () => {
    props.openModal({
      ...pick(props, ['id', 'from', 'to', 'notes']),
      memberId: props.member.id,
      positionId: props.position.id,
      clanId: props.clan?.id,
    });
  };

  return (
    <List.Item
      actions={
        guildRole.isManager
          ? [
              <Button key="update" type="link" onClick={openUpdateModal}>
                Update
              </Button>,
              <Button key="delete" danger type="link" onClick={deleteGuildPositionConfirm}>
                Delete
              </Button>,
            ]
          : []
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={props.member.user.image} />}
        title={props.position.name}
        description={props.member.user.fullName}
      />
      <div>
        {format(props.from)} - {props.to ? format(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
