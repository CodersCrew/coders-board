import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSquadPositionMutations } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useSquadContext } from '../SquadContext';

type Params = {
  positionName: string;
  id: string;
};

export const useDeleteSquadPositionConfirm = ({ positionName, id }: Params) => {
  const theme = useTheme();
  const { squadId } = useSquadContext();
  const { deleteSquadPosition } = useSquadPositionMutations();

  return () => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete user position "${positionName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete position',
      cancelText: 'No, preserve position',
      width: 440,
      onOk: () =>
        runMutation({
          mutation: deleteSquadPosition({ id, squadId }),
          messages: getGenericMessages('team position', 'delete'),
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={theme.colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
