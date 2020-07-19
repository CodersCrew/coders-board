export const omit = (originalObject: Record<string, unknown> = {}, keysToOmit: string[] = []) => {
  const clonedObject = { ...originalObject };

  // eslint-disable-next-line no-restricted-syntax
  for (const path of keysToOmit) {
    delete clonedObject[path];
  }

  return clonedObject;
};
