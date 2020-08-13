import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSquadPositions } from '@/graphql/squads';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type Params = {
  positionName: string;
  id: string;
};

export const useDeleteSquadPositionConfirm = ({ positionName, id }: Params) => {
  const theme = useTheme();
  const { squadId } = useSquadContext();
  const squadPositions = useSquadPositions();

  const messages = getBasicMessages('team position', 'delete');

  return () => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete user position "${positionName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete position',
      cancelText: 'No, preserve position',
      width: 440,
      onOk: async () => {
        try {
          messages.loading();
          await squadPositions.delete({ variables: { id, squadId } });
          messages.success();
        } catch (ex) {
          console.log(ex);
          messages.failure();
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={theme.colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
