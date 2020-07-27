import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';

export const breadcrumbItemRender: BreadcrumbProps['itemRender'] = (route, params, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;

  return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
};
