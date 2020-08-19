import React from 'react';

import { Box, BoxProps } from '@/components/atoms';
import { FC } from '@/typings/components';

export type PageContentProps = Omit<BoxProps, 'color'>;

export const PageContent: FC<PageContentProps> = props => {
  return <Box p={24} {...props} />;
};
