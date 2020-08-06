import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
import { TabsProps } from 'antd/lib/tabs';

import { PageHeader } from '@/components/molecules';
import { breadcrumbItemRender } from '@/utils/breadcrumbItemRender';

import { useGuildLayoutGuildQuery } from './GuildLayout.apollo';

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
  const { data } = useGuildLayoutGuildQuery({ variables: { id } });

  if (!data) return null;

  const { name, image, description } = data.guild;

  const fullName = `${name} Guild`;

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
    <>
      <StyledPageHeader
        title={fullName}
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
