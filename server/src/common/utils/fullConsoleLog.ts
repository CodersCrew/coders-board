import util from 'util';

export const fullConsoleLog = (...args: unknown[]): void[] =>
  args.map(value => console.log(util.inspect(value, { showHidden: false, depth: null })));
