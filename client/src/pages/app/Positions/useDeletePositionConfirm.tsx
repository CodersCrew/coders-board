import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { usePositionMutations } from '@/graphql/positions';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

type Params = {
  name: string;
  id: string;
};

export const useDeletePositionConfirm = ({ name, id }: Params) => {
  const { deletePosition } = usePositionMutations();
  const { colors } = useTheme();

  return () =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete position "${name}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete position',
      cancelText: 'No, preserve position',
      onOk: () =>
        runMutation({
          mutation: deletePosition({ id }),
          messages: getGenericMessages('position', 'delete'),
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
};
