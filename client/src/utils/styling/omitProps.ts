export const omitProps = (propsToOmit: string[] = [], except?: string[]) => {
  const toOmit = except ? propsToOmit.filter(p => !except.includes(p)) : propsToOmit;
  const regex = new RegExp(`^(${toOmit.join('|')})$`);

  return (propName: string) => !regex.test(propName);
};
