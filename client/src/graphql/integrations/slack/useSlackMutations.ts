import { GraphQLOperations, InitialSyncSlackUserInput, SyncSlackUserInput } from '@/typings/graphql';

import { useInitialSyncSlackUserMutation, useSyncSlackUserMutation } from './slack.apollo';

export const useSlackMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.users],
  };

  const [initialSyncSlackUser] = useInitialSyncSlackUserMutation(mutationConfig);
  const [syncSlackUser] = useSyncSlackUserMutation(mutationConfig);

  return {
    initialSyncSlackUser: (data: InitialSyncSlackUserInput) => initialSyncSlackUser({ variables: { data } }),
    syncSlackUser: (data: SyncSlackUserInput) => syncSlackUser({ variables: { data } }),
  };
};
