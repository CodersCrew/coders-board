import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { List } from 'antd';

import { Box, Tag, Title } from '@/components/atoms';
import { UsePositions } from '@/graphql/positions';
import { useAuthorizedUser } from '@/graphql/users';
import { CFC } from '@/typings/components';
import { pick } from '@/utils/objects';

import { PositionModalData } from './PositionModal';
import { useDeletePositionConfirm } from './useDeletePositionConfirm';

type PositionType = UsePositions['item'];

export type PositionProps = PositionType & {
  openEditModal: (data: PositionModalData) => void;
};

const getTagText = (guild: PositionType['guild'], clan: PositionType['clan']) => {
  if (clan) return `${clan.name} clan`;
  if (guild) return `${guild.name} guild`;

  return 'General';
};

export const Position: CFC<PositionProps> = props => {
  const { isAdmin } = useAuthorizedUser();
  const theme = useTheme();
  const deletePositionConfirm = useDeletePositionConfirm(pick(props, ['id', 'name']));

  const openUpdateModal = () => {
    props.openEditModal({
      ...pick(props, ['id', 'name', 'description', 'image', 'scopes']),
      guildId: props.guild?.id,
      clanId: props.clan?.id,
    });
  };

  const tagColor = props.guild?.color ?? theme.colors.gray[7];
  const tagText = getTagText(props.guild, props.clan);

  const title = (
    <Box display="flex" alignItems="center">
      <Title level={4}>{props.name}</Title>
      <Tag color={tagColor} outlined ml={12}>
        {tagText}
      </Tag>
    </Box>
  );

  const actions = isAdmin
    ? [
        <DeleteOutlined key="delete" onClick={deletePositionConfirm} />,
        <EditOutlined key="edit" onClick={openUpdateModal} />,
      ]
    : undefined;

  return (
    <List.Item actions={actions} style={{ padding: 24 }}>
      <List.Item.Meta title={title} description={props.description} />
    </List.Item>
  );
};
