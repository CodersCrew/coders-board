import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { TabsProps } from 'antd/lib/tabs';

import { Page } from '@/components/molecules';
import { useGuild } from '@/graphql/guilds';
import { breadcrumbItemRender } from '@/utils/breadcrumbItemRender';

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

  const routes: BreadcrumbProps['routes'] = [
    {
      path: '/app/teams',
      breadcrumbName: 'Teams',
    },
    {
      path: location.pathname,
      breadcrumbName: fullName,
    },
  ];

  const handleItemChange: TabsProps['onChange'] = activeKey => navigate(activeKey);

  const footer = (
    <Tabs activeKey={location.pathname.split('/').pop()} onChange={handleItemChange}>
      <Tabs.TabPane tab="Members" key="members" />
      <Tabs.TabPane tab="Clans" key="clans" />
      <Tabs.TabPane tab="Positions" key="positions" />
    </Tabs>
  );

  return (
    <Page>
      <StyledPageHeader
        title={fullName}
        breadcrumb={{ routes, itemRender: breadcrumbItemRender }}
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
