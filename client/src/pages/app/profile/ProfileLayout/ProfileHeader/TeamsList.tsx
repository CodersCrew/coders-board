import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from 'antd';

import { Box, Paragraph } from '@/components/atoms';
import { CFC } from '@/typings/components';

type TeamItem = {
  id: string;
  image: string;
  name: string;
};

type TeamsListProps = {
  title: string;
  items: TeamItem[];
};

const Image = styled.img(({ theme }) => ({
  borderRadius: theme.radii.small,
  width: 40,
  height: 24,
  objectFit: 'cover',

  '& + &': {
    marginLeft: 8,
  },
}));

export const TeamsList: CFC<TeamsListProps> = ({ title, items }) => {
  return (
    <Box display="flex">
      <Paragraph strong mr={8}>
        {title}:
      </Paragraph>
      {items.map(({ id, name, image }) => (
        <Tooltip key={id} title={name}>
          <Image src={image} alt={name} />
        </Tooltip>
      ))}
    </Box>
  );
};
