import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { GraphQLOperations } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useDeletePositionMutation } from './Position.apollo';

type Params = {
  name: string;
  id: string;
};

export const useDeletePositionConfirm = ({ name, id }: Params) => {
  const [deletePosition] = useDeletePositionMutation({ refetchQueries: [GraphQLOperations.Query.positions] });
  const { colors } = useTheme();

  const messages = getBasicMessages('position', 'delete');

  return {
    deletePositionConfirm: () =>
      confirmModal({
        title: 'Are you sure?',
        content: `Are you sure you want to delete position "${name}"? This operation will be permanent and cannot be undone.`,
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
      }),
  };
};
