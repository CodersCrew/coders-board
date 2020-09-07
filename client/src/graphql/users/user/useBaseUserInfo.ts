import { BaseUserInfoQuery, BaseUserInfoQueryVariables, useBaseUserInfoQuery } from './user.apollo';

export type UseBaseUserInfo = {
  data: BaseUserInfoQuery['user'];
  variables: BaseUserInfoQueryVariables;
};

export const useBaseUserInfo = (variables: UseBaseUserInfo['variables']) => {
  const { data, loading, error, refetch } = useBaseUserInfoQuery({ variables });

  return {
    loading,
    error,
    refetch,
    data: data?.user ?? null,
  };
};
