import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
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

export const useArchiveSquadMemberConfirm = () => {
  const theme = useTheme();
  const { squadId } = useSquadContext();
  const { archiveSquadMember } = useSquadMemberMutations();

  return ({ fullName, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to archive squad member "${fullName}"?`,
      okText: 'Yes, archive member',
      cancelText: 'No, keep member',
      width: 440,
      onOk: () =>
        runMutation({
          mutation: archiveSquadMember({ id, squadId }),
          messages: {
            ...getGenericMessages('member', 'archive'),
            failure: ({ graphQLErrors }) => graphQLErrors[0].message,
          },
        }),
      icon: <Icon icon={InboxOutlined} color={theme.colors.warning.main} />,
      autoFocusButton: null,
    });
  };
};
