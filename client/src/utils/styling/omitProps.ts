export const omitProps = (propsToOmit: string[] = []) => {
  const regex = new RegExp(`^(${propsToOmit.join('|')})$`);

  return (propName: string) => !regex.test(propName);
};
