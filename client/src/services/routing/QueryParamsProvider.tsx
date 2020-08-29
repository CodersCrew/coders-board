import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { FC } from '@/typings/components';

type ChildrenParam = {
  location: ReturnType<typeof useLocation>;
  history: {
    location: ReturnType<typeof useLocation>;
    push: (to: string) => void;
    replace: (to: string) => void;
  };
};

type ReactRouterRouteProps = {
  children: (param: ChildrenParam) => ReactNode;
};

const ReactRouterRoute = (({ children }: ReactRouterRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const history = {
    location,
    push: (to: string) => navigate(to),
    replace: (to: string) => navigate(to, { replace: true }),
  };

  return children({ location, history });
}) as FC;

export const QueryParamsProvider: FC = ({ children }) => {
  return (
    <QueryParamProvider ReactRouterRoute={ReactRouterRoute} stringifyOptions={{ skipEmptyString: true }}>
      {children}
    </QueryParamProvider>
  );
};
