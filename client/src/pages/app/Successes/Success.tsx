import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Timeline } from 'antd';

import { Box, Paragraph, Tag, Title } from '@/components/atoms';
import { ActionsDropdown, Card, DropdownAction } from '@/components/molecules';
import { UseSuccesses } from '@/graphql/successes';
import { useAuthorizedUser } from '@/graphql/users';
import { SuccessType } from '@/typings/graphql';
import { formatDate } from '@/utils/dates';
import { pick } from '@/utils/objects';

import { SuccessFooter } from './SuccessFooter';
import { SuccessModalData } from './SuccessModal';
import { useDeleteSuccessConfirm } from './useDeleteSuccessConfirm';

type Success = UseSuccesses['item'];

type SuccessProps = {
  success: Success;
  openEditModal: (data: SuccessModalData) => void;
};

const TimelineItem = styled(Timeline.Item)(({ theme }) => ({
  '.ant-timeline-item-head': {
    width: 16,
    height: 16,
  },

  '.ant-timeline-item-tail': {
    left: 7,
    borderWidth: 2,
    borderColor: theme.colors.border.base,
  },

  '.ant-timeline-item-last > .ant-timeline-item-tail': {
    display: 'block',
  },
}));

const useSuccessColor = (successType: SuccessType) => {
  const theme = useTheme();

  if (successType === SuccessType.Epic) return theme.colors.successes.epic;
  if (successType === SuccessType.Small) return theme.colors.successes.small;

  return theme.colors.successes.news;
};

const Actions = ({ success, openEditModal }: SuccessProps) => {
  const { isAdmin } = useAuthorizedUser();
  const deleteSuccessConfirm = useDeleteSuccessConfirm(pick(success, ['id', 'name']));

  if (!isAdmin) return null;

  const actions: DropdownAction[] = [
    {
      label: 'Edit success',
      icon: EditOutlined,
      onClick: () =>
        openEditModal({
          ...pick(success, ['id', 'name', 'description', 'date', 'type']),
          usersIds: success.users.map(({ id }) => id),
        }),
    },
    {
      label: 'Delete success',
      icon: DeleteOutlined,
      onClick: () => deleteSuccessConfirm(),
      danger: true,
    },
  ];

  return <ActionsDropdown actions={actions} />;
};

export const Success = ({ success, openEditModal }: SuccessProps) => {
  const successColor = useSuccessColor(success.type);

  return (
    <TimelineItem color={successColor}>
      <Box>
        <Tag mt={4} mb={16} color={successColor}>
          {formatDate('d MMMM yyyy')(success.date)}
        </Tag>
        <Card mb={16} px={24} py={16}>
          <Box display="flex" justifyContent="space-between">
            <Title level={4}>{success.name}</Title>
            <Actions success={success} openEditModal={openEditModal} />
          </Box>
          <Paragraph mt={12} ellipsis={{ rows: 4, expandable: true }}>
            {success.description}
          </Paragraph>
          {success.users.length && <SuccessFooter users={success.users} />}
        </Card>
      </Box>
    </TimelineItem>
  );
};
