import styled from '@emotion/styled';
import { PageHeader as AntPageHeader } from 'antd';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';

export type PageHeaderProps = AntPageHeaderProps;

export const PageHeader = styled(AntPageHeader)<PageHeaderProps>(({ theme }) => ({
  backgroundColor: theme.colors.background.component,
}));
