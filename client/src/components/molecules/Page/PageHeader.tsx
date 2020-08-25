import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { PageHeader as AntPageHeader } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';

import { CFC } from '@/typings/components';

type PageHeaderProps = AntPageHeaderProps;

export const createBreadcrumb = (routes: Route[]): BreadcrumbProps => {
  return { routes };
};

const breadcrumbItemRender: BreadcrumbProps['itemRender'] = (route, params, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;

  return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
};

const StyledPageHeader = styled(AntPageHeader)<PageHeaderProps>(({ theme }) => ({
  '&.ant-page-header': {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: theme.shadows.sm,
  },
}));

export const PageHeader: CFC<PageHeaderProps> = props => {
  const breadcrumb: BreadcrumbProps | undefined = props.breadcrumb
    ? { ...props.breadcrumb, itemRender: breadcrumbItemRender }
    : undefined;

  return <StyledPageHeader {...props} breadcrumb={breadcrumb} />;
};

PageHeader.defaultProps = {
  ghost: false,
};
