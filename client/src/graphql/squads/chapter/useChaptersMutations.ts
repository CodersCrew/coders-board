import { GraphQLOperations } from '@/typings/graphql';

import { useCreateChapterMutation, useDeleteChapterMutation, useUpdateChapterMutation } from './chapter.apollo';

export const useChaptersMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.chapters, GraphQLOperations.Query.squad],
  };

  const [createChapter] = useCreateChapterMutation(mutationConfig);
  const [updateChapter] = useUpdateChapterMutation(mutationConfig);
  const [deleteChapter] = useDeleteChapterMutation(mutationConfig);

  return {
    create: createChapter,
    update: updateChapter,
    delete: deleteChapter,
  };
};
