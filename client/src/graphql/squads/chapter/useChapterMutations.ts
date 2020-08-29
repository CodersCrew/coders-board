import { CreateChapterInput, GraphQLOperations, UpdateChapterInput } from '@/typings/graphql';

import {
  DeleteChapterMutationVariables,
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useUpdateChapterMutation,
} from './chapter.apollo';

export const useChapterMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.chapters, GraphQLOperations.Query.squad],
  };

  const [createChapter] = useCreateChapterMutation(mutationConfig);
  const [updateChapter] = useUpdateChapterMutation(mutationConfig);
  const [deleteChapter] = useDeleteChapterMutation(mutationConfig);

  return {
    createChapter: (data: CreateChapterInput) => createChapter({ variables: { data } }),
    updateChapter: (data: UpdateChapterInput) => updateChapter({ variables: { data } }),
    deleteChapter: (variables: DeleteChapterMutationVariables) => deleteChapter({ variables }),
  };
};
