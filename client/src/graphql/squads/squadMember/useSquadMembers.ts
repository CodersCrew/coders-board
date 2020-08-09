import { useEffect } from 'react';

import { GraphQLOperations } from '@/typings/graphql';

import {
  SquadMembersQuery,
  useCreateSquadMemberMutation,
  useDeleteSquadMemberMutation,
  useSquadMembersLazyQuery,
  useUpdateSquadMemberMutation,
} from './squadMember.apollo';

export type UseSquadMembers = {
  item: SquadMembersQuery['squadMembers'][number];
  params: { squadId?: string };
};

export const useSquadMembers = (params?: UseSquadMembers['params']) => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.squadMembers, GraphQLOperations.Query.squadPositions],
  };

  const [fetchMembers, { data, loading, error }] = useSquadMembersLazyQuery();
  const [createMember] = useCreateSquadMemberMutation(mutationConfig);
  const [updateMember] = useUpdateSquadMemberMutation(mutationConfig);
  const [deleteMember] = useDeleteSquadMemberMutation(mutationConfig);

  useEffect(() => {
    if (params?.squadId) {
      fetchMembers({ variables: { squadId: params.squadId } });
    }
  }, [params?.squadId]);

  const squadMembers = data?.squadMembers ?? [];

  return {
    loading,
    error,
    data: squadMembers,
    count: squadMembers.length,
    fetch: fetchMembers,
    create: createMember,
    update: updateMember,
    delete: deleteMember,
  };
};
