import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ClanSelectClansQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type ClanSelectClansQuery = { __typename?: 'Query' } & {
  clans: Array<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
};

export const ClanSelectClansDocument = gql`
  query clanSelectClans($guildId: ID!) {
    clans(guildId: $guildId) {
      id
      name
    }
  }
`;

/**
 * __useClanSelectClansQuery__
 *
 * To run a query within a React component, call `useClanSelectClansQuery` and pass it any options that fit your needs.
 * When your component renders, `useClanSelectClansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClanSelectClansQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useClanSelectClansQuery(
  baseOptions?: Apollo.QueryHookOptions<ClanSelectClansQuery, ClanSelectClansQueryVariables>,
) {
  return Apollo.useQuery<ClanSelectClansQuery, ClanSelectClansQueryVariables>(ClanSelectClansDocument, baseOptions);
}
export function useClanSelectClansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ClanSelectClansQuery, ClanSelectClansQueryVariables>,
) {
  return Apollo.useLazyQuery<ClanSelectClansQuery, ClanSelectClansQueryVariables>(ClanSelectClansDocument, baseOptions);
}
export type ClanSelectClansQueryHookResult = ReturnType<typeof useClanSelectClansQuery>;
export type ClanSelectClansLazyQueryHookResult = ReturnType<typeof useClanSelectClansLazyQuery>;
export type ClanSelectClansQueryResult = Apollo.QueryResult<ClanSelectClansQuery, ClanSelectClansQueryVariables>;
