import React from 'react';
import { Outlet } from 'react-router-dom';

import { Page } from '@/components/molecules';

import { ProfileContextProvider } from '../ProfileContext';
import { DetailsCard } from './DetailsCard';
import { ProfileHeader } from './ProfileHeader';

const ProfileLayout = () => {
  return (
    <Page>
      <ProfileHeader />
      <Page.Content>
        <DetailsCard>
          <Outlet />
        </DetailsCard>
      </Page.Content>
    </Page>
  );
};

export default () => (
  <ProfileContextProvider>
    <ProfileLayout />
  </ProfileContextProvider>
);
