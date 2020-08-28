import React from 'react';
import { BrowserRouter, Navigate, Routes, useRoutes } from 'react-router-dom';

import AppLayout from './pages/app/AppLayout';
import GuildClans from './pages/app/guild/GuildClans';
import GuildLayout from './pages/app/guild/GuildLayout';
import GuildMembers from './pages/app/guild/GuildMembers';
import GuildPositions from './pages/app/guild/GuildPositions';
import Positions from './pages/app/Positions';
import ProfileActivity from './pages/app/profile/ProfileActivity';
import ProfileGeneral from './pages/app/profile/ProfileGeneral';
import ProfileLayout from './pages/app/profile/ProfileLayout';
import SquadChapters from './pages/app/squad/SquadChapters';
import SquadLayout from './pages/app/squad/SquadLayout';
import SquadMembers from './pages/app/squad/SquadMembers';
import SquadPositions from './pages/app/squad/SquadPositions';
import Successes from './pages/app/Successes';
import Teams from './pages/app/Teams';
import Users from './pages/app/Users';
import Login from './pages/Login';
import LoginFailure from './pages/LoginFailure';
import LoginSuccess from './pages/LoginSuccess';
import MainLayout from './pages/MainLayout';
import NotFound from './pages/NotFound';

type Routes = Parameters<typeof useRoutes>[0];

export const routes: Routes = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'login/success', element: <LoginSuccess /> },
      { path: 'login/failure', element: <LoginFailure /> },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="users" /> },
          { path: 'users', element: <Users /> },
          { path: 'teams', element: <Teams /> },
          { path: 'positions', element: <Positions /> },
          { path: 'successes', element: <Successes /> },
          {
            path: 'guild/:id',
            element: <GuildLayout />,
            children: [
              { path: '/', element: <Navigate to="members" /> },
              { path: 'members', element: <GuildMembers /> },
              { path: 'clans', element: <GuildClans /> },
              { path: 'positions', element: <GuildPositions /> },
            ],
          },
          {
            path: 'profile/:id',
            element: <ProfileLayout />,
            children: [
              { path: '/', element: <Navigate to="general" /> },
              { path: 'general', element: <ProfileGeneral /> },
              { path: 'activity', element: <ProfileActivity /> },
            ],
          },
          {
            path: 'squad/:id',
            element: <SquadLayout />,
            children: [
              { path: '/', element: <Navigate to="members" /> },
              { path: 'members', element: <SquadMembers /> },
              { path: 'chapters', element: <SquadChapters /> },
              { path: 'positions', element: <SquadPositions /> },
            ],
          },
          { path: '*', element: <NotFound /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const CurrentPage = () => useRoutes(routes);

const Routing = () => (
  <BrowserRouter>
    <CurrentPage />
  </BrowserRouter>
);

export default Routing;
