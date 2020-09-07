import React from 'react';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, List, Tooltip } from 'antd';

import { UsePositions } from '@/graphql/positions';
import { useAuthorizedUser } from '@/graphql/users';
import { CFC } from '@/typings/components';
import { pick } from '@/utils/objects';

import { PositionModalData } from './PositionModal';
import { useDeletePositionConfirm } from './useDeletePositionConfirm';

export type PositionProps = UsePositions['item'] & {
  openEditModal: (data: PositionModalData) => void;
};

function getArea<T extends Record<string, unknown> | null | undefined>(suffix: string, area: T) {
  return area ? { ...area, suffix } : null;
}

export const Position: CFC<PositionProps> = props => {
  const { isAdmin } = useAuthorizedUser();
  const deletePositionConfirm = useDeletePositionConfirm(pick(props, ['id', 'name']));

  const openUpdateModal = () => {
    props.openEditModal({
      ...pick(props, ['id', 'name', 'description', 'image', 'scopes']),
      guildId: props.guild?.id,
      clanId: props.clan?.id,
    });
  };

  const clan = getArea('clan', props.clan);
  const guild = getArea('guild', props.guild);
  const area = clan ?? guild ?? null;
  const image = props.image ?? area?.image ?? undefined;
  const tooltipTitle = area ? `Related to ${area.name} ${area.suffix}` : 'Unrelated';

  const actions = isAdmin
    ? [
        <DeleteOutlined key="delete" onClick={deletePositionConfirm} />,
        <EditOutlined key="edit" onClick={openUpdateModal} />,
      ]
    : undefined;

  const avatar = (
    <Tooltip title={tooltipTitle}>
      <Avatar src={image} icon={<UserOutlined />} />
    </Tooltip>
  );

  return (
    <List.Item actions={actions}>
      <List.Item.Meta avatar={avatar} title={props.name} description={props.description} />
    </List.Item>
  );
};
