import React from 'react';
import { Avatar, List } from 'antd';
import moment, { Moment } from 'moment';

import { Button } from '@/components/atoms';
import { UseGuildPositions } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { pick } from '@/utils/objects';
import { parseGuildPositionKind } from '@/utils/platform';

import { useGuildContext } from '../GuildContext';
import { GuildPositionModalData } from './GuildPositionModal';
import { useDeleteGuildPositionConfirm } from './useDeleteGuildPositionConfirm';

type GuildPositionProps = UseGuildPositions['item'] & {
  openModal: (data: GuildPositionModalData) => void;
  closeModal: () => void;
};

const formaDate = (date: Moment) => moment(date).format('MMMM YYYY');

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

  const kindName = parseGuildPositionKind(props.kind);
  const positionName = props.clan ? `${kindName} in ${props.clan.name} Clan` : `${kindName} of the guild`;

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
        {formaDate(props.from)} - {props.to ? formaDate(props.to) : 'Now'}
      </div>
    </List.Item>
  );
};
