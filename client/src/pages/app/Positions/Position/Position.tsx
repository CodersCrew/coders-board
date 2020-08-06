import React from 'react';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Avatar, Tooltip } from 'antd';
import { pick } from 'lodash';

import { Card, CardMeta } from '@/components/molecules';
import { useAuthorizedUser } from '@/hooks/useAuth';
import { CFC } from '@/typings/components';
import { WithId } from '@/typings/enhancers';
import { CreatePositionInput } from '@/typings/graphql';

import { PositionsQuery } from '../Positions.apollo';
import { useDeletePositionConfirm } from './useDeletePositionConfirm';

type Position = PositionsQuery['positions'][number];

export type PositionProps = Position & {
  openEditModal: (data?: WithId<CreatePositionInput>) => void;
};

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',

  '.ant-card-body': {
    flex: 1,
  },
});

export const Position: CFC<PositionProps> = props => {
  const { isAdmin } = useAuthorizedUser();
  const { deletePositionConfirm } = useDeletePositionConfirm(pick(props, ['id', 'name']));

  const openUpdateModal = () => {
    props.openEditModal({
      ...pick(props, ['id', 'name', 'description', 'image']),
      // teamId: props.team?.id,
    });
  };

  const image = props.image || undefined;
  // const tooltipTitle = props.team ? `Related to "${props.team.name}" team` : 'Unrelated';
  const tooltipTitle = 'Unrelated';
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
    <StyledCard key={props.id} p={16} actions={actions}>
      <CardMeta avatar={avatar} title={props.name} description={props.description} />
    </StyledCard>
  );
};
