import { useNavigate } from 'react-router-dom';

import { GraphQLOperations, SignInInput } from '@/typings/graphql';

import { useMeQuery, useSignInMutation } from './auth.apollo';

export const useAuth = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation({ refetchQueries: [GraphQLOperations.Query.me] });
  const { loading, data, error } = useMeQuery();

  const me = data?.me ?? null;

  const handleSignIn = async (input: SignInInput) => {
    await signIn({ variables: { data: input } });
    navigate('/app');
  };

  return {
    isAuthorized: Boolean(me),
    loading,
    error,
    signIn: handleSignIn,
  };
};
