import { createHash } from 'crypto';

export const createGravatar = (email: string) => {
  const hash = createHash('md5')
    .update(email)
    .digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};
