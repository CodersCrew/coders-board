import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffectOnce(() => {
    navigate('/app/members');
  });

  return <div>LoginSuccess page</div>;
};

export default LoginSuccess;
