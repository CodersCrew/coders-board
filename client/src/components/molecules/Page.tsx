import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { PageHeader as AntPageHeader } from 'antd';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';

import { FC } from '@/typings/components';

import { Box, BoxProps } from '../atoms';

type PageHeaderProps = AntPageHeaderProps;

const PageHeader = styled(AntPageHeader)<PageHeaderProps>(({ theme }) => ({
  backgroundColor: theme.colors.background.component,
  position: 'sticky',
  top: 0,
  zIndex: 100,
}));

export type PageContentProps = Omit<BoxProps, 'color'>;

const PageContent: FC<PageContentProps> = props => {
  return <Box p={24} {...props} />;
};

export type PageProps = {
  children: ReactNode;
};

export const Page = ({ children }: PageProps) => <>{children}</>;

Page.Header = PageHeader;
Page.Content = PageContent;
