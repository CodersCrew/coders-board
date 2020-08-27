import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';

import { createBreadcrumb, Page } from '@/components/molecules';
import { useGuild } from '@/graphql/guilds';

import { GuildContextProvider, useGuildContext } from './GuildContext';

const StyledPageHeader = styled(Page.Header)({
  '.ant-avatar': {
    width: 72,
    height: 40,
  },
});

const GuildLayout = () => {
  const { guildId } = useGuildContext();
  const location = useLocation();
  const navigate = useNavigate();
  const guild = useGuild({ guildId });

  if (!guild.data) return null;

  const fullName = `${guild.data.name} Guild`;
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

  const footer = (
    <Tabs activeKey={activeTabKey} onChange={navigate}>
      <Tabs.TabPane tab="Members" key="members" />
      <Tabs.TabPane tab="Clans" key="clans" />
      <Tabs.TabPane tab="Positions" key="positions" />
    </Tabs>
  );

  return (
    <Page>
      <StyledPageHeader
        title={fullName}
        breadcrumb={breadcrumb}
        avatar={{ src: guild.data.image, shape: 'square' }}
        footer={footer}
      >
        {guild.data.description}
      </StyledPageHeader>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

export default () => (
  <GuildContextProvider>
    <GuildLayout />
  </GuildContextProvider>
);
