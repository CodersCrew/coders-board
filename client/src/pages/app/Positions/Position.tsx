import React from 'react';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Tooltip } from 'antd';

import { Icon } from '@/components/atoms';
import { Card, CardMeta, confirmModal } from '@/components/molecules';
import { useIsAdmin } from '@/hooks/useAuth';
import { CFC } from '@/typings/components';
import { WithId } from '@/typings/enhancers';
import { CreatePositionInput, GraphQLOperations } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { PositionsQuery, useDeletePositionMutation } from './Positions.apollo';

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
  const [deletePosition] = useDeletePositionMutation({ refetchQueries: [GraphQLOperations.Query.positions] });
  const { isAdmin } = useIsAdmin();
  const { colors } = useTheme();

  const messages = getBasicMessages('position', 'delete');

  const openUpdatePositionModal = () => {
    props.openEditModal({
      id: props.id,
      name: props.name,
      description: props.description,
      image: props.image,
      teamId: props.team?.id,
    });
  };

  const openDeletePositionModal = () =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete position "${props.name}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete position',
      cancelText: 'No, preserve position',
      onOk: async () => {
        try {
          messages.loading();
          await deletePosition({ variables: { id: props.id } });
          messages.success();
        } catch (ex) {
          console.log(ex);
          messages.failure();
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });

  const image = props.image || props.team?.image || undefined;
  const tooltipTitle = props.team ? `Related to "${props.team.name}" team` : 'Unrelated';
  const actions = isAdmin
    ? [
        <DeleteOutlined key="delete" onClick={openDeletePositionModal} />,
        <EditOutlined key="edit" onClick={openUpdatePositionModal} />,
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
