import React from 'react';
import { Avatar, List } from 'antd';

import { Button } from '@/components/atoms';
import { UseGuildPositions } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { formatDate } from '@/utils/dates';
import { pick } from '@/utils/objects';
import { getPositionInGuild } from '@/utils/platform';

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
  const deleteGuildPositionConfirm = useDeleteGuildPositionConfirm(pick(props, ['id', 'kind']));

  const openUpdateModal = () => {
    props.openModal({
      ...pick(props, ['id', 'from', 'to', 'kind', 'notes']),
      memberId: props.member.id,
      clanId: props.clan?.id,
    });
  };

  const positionName = getPositionInGuild(props.kind, props.clan?.name);

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
        title={positionName}
        description={props.member.user.fullName}
      />
      <div>
        {format(props.from)} - {props.to ? format(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
