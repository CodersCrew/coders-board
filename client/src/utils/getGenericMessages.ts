export const getGenericMessages = (name: string, kind: 'create' | 'update' | 'delete') => {
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
    loading: () => messages.loading,
    success: () => messages.success,
    failure: () => messages.failure,
  };
};
