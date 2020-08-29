import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useUsersMutations } from '@/graphql/users';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteUserConfirm = () => {
  const { deleteUser } = useUsersMutations();
  const { colors } = useTheme();

  return ({ fullName, id }: Params) =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete user "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete user',
      cancelText: 'No, preserve user',
      onOk: () =>
        runMutation({
          mutation: deleteUser({ id }),
          messages: getGenericMessages('user', 'delete'),
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
};
