import { message } from 'antd';

export const getBasicMessages = (name: string, state: 'create' | 'update' | 'delete') => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  let messages = {
    loading: `Adding a new ${name}...`,
    success: `${nameCapitalized} added successfully`,
    failure: `Error with ${name} adding`,
  };

  if (state === 'update') {
    messages = {
      loading: `Updating ${name}...`,
      success: `${nameCapitalized} updated successfully`,
      failure: `Error with ${name} updating`,
    };
  }

  if (state === 'delete') {
    messages = {
      loading: `Removing ${name}...`,
      success: `${nameCapitalized} removed successfully`,
      failure: `Error with ${name} removing`,
    };
  }

  return {
    loading: () => message.loading(messages.loading, 0),
    success: () => message.success(messages.success),
    failure: () => message.error(messages.failure),
  };
};
