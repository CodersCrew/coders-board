import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { TabsProps } from 'antd/lib/tabs';

import { useTeamQuery } from './TeamLayout.apollo';
import { PageHeader } from '@/components/molecules';
import { TeamKind } from '@/typings/graphql';
import { breadcrumbItemRender } from '@/utils/breadcrumbItemRender';

const StyledPageHeader = styled(PageHeader)({
  '.ant-avatar': {
    width: 72,
    height: 40,
  },
});

const TeamLayout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useTeamQuery({ variables: { id } });

  if (!data) return null;

  const { children, name, image, description, kind, parent } = data.team;

  const routes: BreadcrumbProps['routes'] = [];

  routes.push({
    path: '/app/teams',
    breadcrumbName: 'Teams',
  });

  if (parent) {
    routes.push({
      path: `/app/teams/${parent.id}/members`,
      breadcrumbName: parent.name,
    });
  }

  routes.push({
    path: location.pathname,
    breadcrumbName: name,
  });

  const handleItemChange: TabsProps['onChange'] = activeKey => navigate(activeKey);

  const footer = (
    <Tabs activeKey={location.pathname.split('/').pop()} onChange={handleItemChange}>
      <Tabs.TabPane tab="Members" key="members" />
      {children.length && <Tabs.TabPane tab={kind === TeamKind.Guild ? 'Clans' : 'Chapters'} key="children" />}
    </Tabs>
  );

  return (
    <>
      <StyledPageHeader
        title={name}
        breadcrumb={{ routes, itemRender: breadcrumbItemRender }}
        avatar={{ src: image, shape: 'square' }}
        footer={footer}
      >
        {description}
      </StyledPageHeader>
      <Outlet />
    </>
  );
};

export default TeamLayout;
