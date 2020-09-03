import { GraphQLOperations, InitialSyncSlackUserInput } from '@/typings/graphql';

import { useSyncSlackUserMutation } from './slack.apollo';

export const useSlackMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.users],
  };

  const [initialSyncSlackUser] = useSyncSlackUserMutation(mutationConfig);

  return {
    initialSyncSlackUser: (data: InitialSyncSlackUserInput) => initialSyncSlackUser({ variables: { data } }),
  };
};
