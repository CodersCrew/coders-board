/**
 * Returns a function that can be passed to Emotion's shouldForwardProp to omit some of the styled component props.
 * @param propsToOmit Array of props to omit.
 */
export const omitProps = (propsToOmit: string[] = []) => {
  const regex = new RegExp(`^(${propsToOmit.join('|')})$`);

  return (propName: string) => !regex.test(propName);
};
