import { GraphQLOperations, InitialSyncSlackUserInput } from '@/typings/graphql';

import { useInitialSyncSlackUserMutation } from './slack.apollo';

export const useSlackMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.users],
  };

  const [initialSyncSlackUser] = useInitialSyncSlackUserMutation(mutationConfig);

  return {
    initialSyncSlackUser: (data: InitialSyncSlackUserInput) => initialSyncSlackUser({ variables: { data } }),
  };
};
