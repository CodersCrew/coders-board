import React from 'react';
import { Avatar, List } from 'antd';
import { pick } from 'lodash';
import moment, { Moment } from 'moment';

import { Button } from '@/components/atoms';
import { UseGuildPositions } from '@/graphql/guilds';
import { CFC } from '@/typings/components';
import { parseGuildPositionKind } from '@/utils/platform';

import { GuildPositionModalProps } from './GuildPositionModal';
import { useDeleteGuildPositionConfirm } from './useDeleteGuildPositionConfirm';

type GuildPositionProps = UseGuildPositions['item'] & {
  openModal: (data: GuildPositionModalProps['data']) => void;
  closeModal: () => void;
};

const formaDate = (date: Moment) => moment(date).format('MMMM YYYY');

export const GuildPosition: CFC<GuildPositionProps> = props => {
  const deleteGuildPositionConfirm = useDeleteGuildPositionConfirm({
    ...pick(props, ['id', 'kind']),
    guildId: props.member.guild.id,
  });

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
      actions={[
        <Button key="update" type="link" onClick={openUpdateModal}>
          Update
        </Button>,
        <Button key="delete" danger type="link" onClick={deleteGuildPositionConfirm}>
          Delete
        </Button>,
      ]}
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
