import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type CreateTeamMemberMutationVariables = Types.Exact<{
  data: Types.CreateTeamMemberInput;
}>;

export type CreateTeamMemberMutation = { __typename?: 'Mutation' } & {
  createTeamMember: { __typename?: 'TeamMember' } & Pick<Types.TeamMember, 'id'>;
};

export const CreateTeamMemberDocument = gql`
  mutation createTeamMember($data: CreateTeamMemberInput!) {
    createTeamMember(data: $data) {
      id
    }
  }
`;
export type CreateTeamMemberMutationFn = ApolloReactCommon.MutationFunction<
  CreateTeamMemberMutation,
  CreateTeamMemberMutationVariables
>;

/**
 * __useCreateTeamMemberMutation__
 *
 * To run a mutation, you first call `useCreateTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMemberMutation, { data, loading, error }] = useCreateTeamMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>(
    CreateTeamMemberDocument,
    baseOptions,
  );
}
export type CreateTeamMemberMutationHookResult = ReturnType<typeof useCreateTeamMemberMutation>;
export type CreateTeamMemberMutationResult = ApolloReactCommon.MutationResult<CreateTeamMemberMutation>;
export type CreateTeamMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTeamMemberMutation,
  CreateTeamMemberMutationVariables
>;
