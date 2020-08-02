import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { GraphQLOperations } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useDeleteTeamPositionMutation } from './TeamPosition.apollo';

type Params = {
  positionName: string;
  id: string;
};

export const useDeleteTeamPositionConfirm = ({ id, positionName }: Params) => {
  const { colors } = useTheme();
  const [deletePosition] = useDeleteTeamPositionMutation({
    refetchQueries: [GraphQLOperations.Query.teamMembers, GraphQLOperations.Query.teamPositions],
  });

  const messages = getBasicMessages('team position', 'delete');

  return {
    deleteTeamPositionConfirm: () => {
      confirmModal({
        title: 'Are you sure?',
        content: `Are you sure you want to delete user position "${positionName}"? This operation will be permanent and cannot be undone.`,
        okText: 'Yes, delete position',
        cancelText: 'No, preserve position',
        onOk: async () => {
          try {
            messages.loading();
            await deletePosition({ variables: { id } });
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
    },
  };
};
