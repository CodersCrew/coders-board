import { format } from 'date-fns';

/**
 * Return the formatted date string in the given format.
 * @param date The original date.
 * @param shape The string of tokens.
 */
export const formatDate = (shape: string) => (date: Date | string) => {
  if (typeof date === 'string') return format(new Date(date), shape);
  return format(date, shape);
};
