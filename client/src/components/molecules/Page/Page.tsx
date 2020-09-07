import React, { ReactNode } from 'react';

import { PageContent } from './PageContent';
import { PageHeader } from './PageHeader';

export type PageProps = {
  children: ReactNode;
};

export const Page = ({ children }: PageProps) => <>{children}</>;

Page.Header = PageHeader;
Page.Content = PageContent;
