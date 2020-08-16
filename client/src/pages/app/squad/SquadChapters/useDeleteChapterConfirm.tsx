import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useChaptersMutations } from '@/graphql/squads';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type Params = {
  name: string;
  id: string;
};

export const useDeleteChapterConfirm = () => {
  const theme = useTheme();
  const { squadId } = useSquadContext();
  const chaptersMutations = useChaptersMutations();

  const messages = getBasicMessages('chapter', 'delete');

  return ({ name, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete chapter "${name}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete chapter',
      cancelText: 'No, preserve chapter',
      width: 440,
      onOk: async () => {
        try {
          messages.loading();
          await chaptersMutations.delete({ variables: { id, squadId } });
          messages.success();
        } catch ({ graphQLErrors }) {
          messages.failure(graphQLErrors[0].message);
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={theme.colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
