export const omit = <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(
  originalObject: T,
  keysToOmit: K,
): {
  [K2 in Exclude<keyof T, K[number]>]: T[K2];
} => {
  const clonedObject = { ...originalObject };

  // eslint-disable-next-line no-restricted-syntax
  for (const path of keysToOmit) {
    delete clonedObject[path];
  }

  return clonedObject;
};
