import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';

import { createBreadcrumb, Page } from '@/components/molecules';
import { useSquad } from '@/graphql/squads';

import { SquadContextProvider, useSquadContext } from './SquadContext';

const StyledPageHeader = styled(Page.Header)({
  '.ant-avatar': {
    width: 72,
    height: 40,
  },
});

const SquadLayout = () => {
  const { squadId, squadRole } = useSquadContext();
  const location = useLocation();
  const navigate = useNavigate();
  const squad = useSquad({ id: squadId });

  if (!squad.data) return null;

  const fullName = `${squad.data.name} Squad`;
  const activeTabKey = location.pathname.split('/').pop();

  const breadcrumb = createBreadcrumb([
    {
      path: '/app/teams',
      breadcrumbName: 'Teams',
    },
    {
      path: location.pathname,
      breadcrumbName: fullName,
    },
  ]);

  const showChapters = squadRole.isOwner || squad?.data?.chapters?.length;

  const footer = (
    <Tabs activeKey={activeTabKey} onChange={navigate}>
      <Tabs.TabPane tab="Members" key="members" />
      {showChapters && <Tabs.TabPane tab="Chapters" key="chapters" />}
      <Tabs.TabPane tab="Positions" key="positions" />
    </Tabs>
  );

  return (
    <Page>
      <StyledPageHeader
        title={fullName}
        breadcrumb={breadcrumb}
        avatar={{ src: squad.data.image, shape: 'square' }}
        footer={footer}
      >
        {squad.data.description}
      </StyledPageHeader>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

export default () => (
  <SquadContextProvider>
    <SquadLayout />
  </SquadContextProvider>
);
