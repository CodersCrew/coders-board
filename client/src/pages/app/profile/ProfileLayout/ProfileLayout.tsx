import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@/components/atoms';
import { Page } from '@/components/molecules';

import { ProfileContextProvider } from '../ProfileContext';
import { BaseInfoCard } from './BaseInfoCard';
import { DetailsCard } from './DetailsCard';

const ProfileLayout = () => {
  return (
    <Page>
      <Page.Content>
        <Box display="grid" gridTemplateColumns={{ default: '1fr', xl: '400px 1fr' }} gridGap={24}>
          <BaseInfoCard />
          <DetailsCard>
            <Outlet />
          </DetailsCard>
        </Box>
      </Page.Content>
    </Page>
  );
};

export default () => (
  <ProfileContextProvider>
    <ProfileLayout />
  </ProfileContextProvider>
);
