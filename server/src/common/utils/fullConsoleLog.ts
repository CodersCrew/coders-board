import util from 'util';

export const fullConsoleLog = (...args: unknown[]): void[] =>
  // eslint-disable-next-line no-console
  args.map(value => console.log(util.inspect(value, { showHidden: false, depth: null })));
