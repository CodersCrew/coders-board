import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Tabs } from 'antd';

import { Box, Paragraph, Title } from '@/components/atoms';
import { Page } from '@/components/molecules';
import { useBaseUserInfo } from '@/graphql/users';

import { useProfileContext } from '../../ProfileContext';
import { UserTeams } from './UserTeams';

const PageHeader = styled(Page.Header)({
  '.ant-page-header-heading-extra': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const ProfileHeader = () => {
  const { userId } = useProfileContext();
  const { loading, data } = useBaseUserInfo({ id: userId });
  const navigate = useNavigate();
  const location = useLocation();

  const activeTabKey = location.pathname.split('/').pop();

  const footer = (
    <Tabs activeKey={activeTabKey} onChange={navigate}>
      <Tabs.TabPane tab="General" key="general" />
      <Tabs.TabPane tab="Activity" key="activity" />
    </Tabs>
  );

  if (loading || !data) {
    return null;
  }

  const title = (
    <Box>
      <Title level={4} mb={-4}>
        {data.fullName}
      </Title>
      <Paragraph type="secondary">{data.primaryEmail}</Paragraph>
    </Box>
  );

  return (
    <PageHeader
      title={title}
      avatar={{ src: data.thumbnail, size: 'large' }}
      footer={footer}
      extra={<UserTeams guilds={data.guilds} squads={data.squads} />}
    />
  );
};
