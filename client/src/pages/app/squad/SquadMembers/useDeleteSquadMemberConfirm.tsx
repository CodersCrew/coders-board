import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSquadMemberMutations } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useSquadContext } from '../SquadContext';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteSquadMemberConfirm = () => {
  const theme = useTheme();
  const { squadId } = useSquadContext();
  const { deleteSquadMember } = useSquadMemberMutations();

  return ({ fullName, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete squad member "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete member',
      cancelText: 'No, preserve member',
      width: 440,
      onOk: () =>
        runMutation({
          mutation: deleteSquadMember({ id, squadId }),
          messages: {
            ...getGenericMessages('member', 'delete'),
            failure: ({ graphQLErrors }) => graphQLErrors[0].message,
          },
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={theme.colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
