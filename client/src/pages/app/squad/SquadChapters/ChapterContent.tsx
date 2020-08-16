import React from 'react';
import styled from '@emotion/styled';
import { List } from 'antd';

import { Avatar } from '@/components/atoms';
import { UseChapters } from '@/graphql/squads';

type ChapterContentProps = {
  chapter: UseChapters['item'];
};

type Positions = Record<string, UseChapters['item']['positions']>;

const ChapterContentContainer = styled.div(({ theme }) => ({
  '.ant-list-empty-text': {
    display: 'none',
  },

  '.ant-list-item-meta-title, .ant-list-item-meta': {
    marginBottom: 0,
  },

  '.ant-list-item-meta-title': {
    fontSize: theme.fontSizes.normal,
    lineHeight: theme.lineHeights.normal,
  },
}));

export const ChapterContent = ({ chapter }: ChapterContentProps) => {
  const positionsObj = chapter.positions.reduce<Positions>((acc, cur) => {
    const key = cur.member.id;
    const value = acc[key] ? [...acc[key], cur] : [cur];
    return { ...acc, [key]: value };
  }, {});
  const positionsArr = Object.values(positionsObj);

  return (
    <ChapterContentContainer>
      <List
        size="small"
        rowKey="id"
        itemLayout="horizontal"
        dataSource={positionsArr}
        renderItem={item => {
          const { user } = item[0].member;
          const positions = item.map(({ position }) => position.name);

          return (
            <List.Item>
              <List.Item.Meta
                title={user.fullName}
                avatar={<Avatar src={user.image} />}
                description={positions.join(', ')}
              />
            </List.Item>
          );
        }}
      />
    </ChapterContentContainer>
  );
};
