import { formatDate } from '../formatDate';

describe('formatDate', () => {
  const dateFormatter = formatDate('dd MM yy');

  it('should format dates passed as a Date object', () => {
    const date = new Date(1995, 11, 17);

    expect(dateFormatter(date)).toEqual('17 12 95');
  });

  it('should format dates passed as a string', () => {
    const date = '2020-11-13T03:24:00';

    expect(dateFormatter(date)).toEqual('13 11 20');
  });
});
