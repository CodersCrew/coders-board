import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './pages/app/AppLayout';
import GuildClans from './pages/app/guild/GuildClans';
import GuildLayout from './pages/app/guild/GuildLayout';
import GuildMembers from './pages/app/guild/GuildMembers';
import GuildPositions from './pages/app/guild/GuildPositions';
import Positions from './pages/app/Positions';
import SquadChapters from './pages/app/squad/SquadChapters';
import SquadLayout from './pages/app/squad/SquadLayout';
import SquadMembers from './pages/app/squad/SquadMembers';
import SquadPositions from './pages/app/squad/SquadPositions';
import Teams from './pages/app/Teams';
import Users from './pages/app/Users';
import Login from './pages/Login';
import LoginFailure from './pages/LoginFailure';
import LoginSuccess from './pages/LoginSuccess';
import MainLayout from './pages/MainLayout';
import NotFound from './pages/NotFound';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="login/success" element={<LoginSuccess />} />
          <Route path="login/failure" element={<LoginFailure />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
            <Route path="positions" element={<Positions />} />
            <Route path="guild/:id" element={<GuildLayout />}>
              <Route path="members" element={<GuildMembers />} />
              <Route path="clans" element={<GuildClans />} />
              <Route path="positions" element={<GuildPositions />} />
            </Route>
            <Route path="squad/:id" element={<SquadLayout />}>
              <Route path="members" element={<SquadMembers />} />
              <Route path="chapters" element={<SquadChapters />} />
              <Route path="positions" element={<SquadPositions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
