import { message } from 'antd';

/**
 * Create basic messages for all states of an async operation (loading, success, failure).
 * @param name Name of the entity related to a particular async operation.
 * @param kind Kind of the async operation that will be performed.
 */
export const getBasicMessages = (name: string, kind: 'create' | 'update' | 'delete') => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  let messages = {
    loading: `Adding a new ${name}...`,
    success: `${nameCapitalized} added successfully`,
    failure: `Error when adding a new ${name}`,
  };

  if (kind === 'update') {
    messages = {
      loading: `Updating ${name}...`,
      success: `${nameCapitalized} updated successfully`,
      failure: `Error when updating ${name}`,
    };
  }

  if (kind === 'delete') {
    messages = {
      loading: `Removing ${name}...`,
      success: `${nameCapitalized} removed successfully`,
      failure: `Error when removing ${name}`,
    };
  }

  return {
    loading: (text?: string) => message.loading(text ?? messages.loading, 0),
    success: (text?: string) => message.success(text ?? messages.success),
    failure: (text?: string) => message.error(text ?? messages.failure),
  };
};
