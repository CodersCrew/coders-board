import React, { forwardRef } from 'react';

import { Box, BoxProps } from './Box';

export type PageContentProps = Omit<BoxProps, 'color'>;

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>((props, ref) => {
  return <Box p={24} ref={ref} {...props} />;
});
