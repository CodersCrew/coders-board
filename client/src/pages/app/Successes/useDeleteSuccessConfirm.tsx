import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSuccessMutations } from '@/graphql/successes';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

type Params = {
  name: string;
  id: string;
};

export const useDeleteSuccessConfirm = ({ name, id }: Params) => {
  const { deleteSuccess } = useSuccessMutations();
  const { colors } = useTheme();

  return () =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete success "${name}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete success',
      cancelText: 'No, preserve success',
      onOk: () =>
        runMutation({
          mutation: deleteSuccess({ id }),
          messages: getGenericMessages('success', 'delete'),
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
};
