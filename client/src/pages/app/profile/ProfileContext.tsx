import { useParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';

const useProfileContextHook = () => {
  const params = useParams();

  const userId = params.id;

  return {
    userId,
  };
};

const ProfileContext = createContainer(useProfileContextHook);

export const useProfileContext = ProfileContext.useContainer;

export const ProfileContextProvider = ProfileContext.Provider;
