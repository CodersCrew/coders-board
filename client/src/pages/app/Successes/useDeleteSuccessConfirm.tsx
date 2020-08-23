import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSuccessesMutations } from '@/graphql/successes';
import { getBasicMessages } from '@/utils/getBasicMessages';

type Params = {
  name: string;
  id: string;
};

export const useDeleteSuccessConfirm = ({ name, id }: Params) => {
  const successesMutations = useSuccessesMutations();
  const { colors } = useTheme();

  const messages = getBasicMessages('success', 'delete');

  return () =>
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete success "${name}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete success',
      cancelText: 'No, preserve success',
      onOk: async () => {
        try {
          messages.loading();
          await successesMutations.delete({ variables: { id } });
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
};
