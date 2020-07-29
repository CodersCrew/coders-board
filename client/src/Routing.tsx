import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './pages/app/AppLayout';
import Members from './pages/app/Members';
import Positions from './pages/app/Positions';
import TeamChildren from './pages/app/team/TeamChildren';
import TeamLayout from './pages/app/team/TeamLayout';
import TeamMembers from './pages/app/team/TeamMembers';
import Teams from './pages/app/Teams';
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
            <Route path="members" element={<Members />} />
            <Route path="teams" element={<Teams />} />
            <Route path="positions" element={<Positions />} />
            <Route path="teams/:id" element={<TeamLayout />}>
              <Route path="members" element={<TeamMembers />} />
              <Route path="children" element={<TeamChildren />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
