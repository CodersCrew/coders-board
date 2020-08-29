import { SquadMembersQuery, SquadMembersQueryVariables, useSquadMembersQuery } from './squadMember.apollo';

export type UseSquadMembers = {
  item: SquadMembersQuery['squadMembers'][number];
  variables: SquadMembersQueryVariables;
};

export const useSquadMembers = (variables: UseSquadMembers['variables']) => {
  const { data, loading, error, refetch } = useSquadMembersQuery({ variables });

  const squadMembers = data?.squadMembers ?? [];

  return {
    loading,
    error,
    refetch,
    data: squadMembers,
    count: squadMembers.length,
  };
};
