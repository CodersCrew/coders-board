import { GraphQLOperations, SyncSlackUserInput } from '@/typings/graphql';

import { useSyncSlackUserMutation } from './slack.apollo';

export const useSlackMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.users],
  };

  const [syncSlackUser] = useSyncSlackUserMutation(mutationConfig);

  return {
    syncUser: (data: SyncSlackUserInput) => syncSlackUser({ variables: { data } }),
  };
};
