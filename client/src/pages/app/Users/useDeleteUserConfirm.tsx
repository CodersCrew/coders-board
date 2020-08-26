import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useUsersMutations } from '@/graphql/users';
import { getBasicMessages } from '@/utils/getBasicMessages';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteUserConfirm = () => {
  const usersMutations = useUsersMutations();
  const { colors } = useTheme();

  const messages = getBasicMessages('user', 'delete');

  return ({ fullName, id }: Params) =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete user "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete user',
      cancelText: 'No, preserve user',
      onOk: async () => {
        try {
          messages.loading();
          await usersMutations.delete({ variables: { id } });
          messages.success();
        } catch (ex) {
          messages.failure(ex.message);
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
};
