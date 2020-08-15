import { useLocation, useNavigate } from 'react-router-dom';
import { omit } from 'lodash';
import querystring from 'query-string';

export function useQueryParam<T extends Array<string>>(name: string, isArray: true): [T, (data: T) => void];
export function useQueryParam<T extends string>(name: string, isArray: false): [T, (data: T) => void];
export function useQueryParam<T>(name: string, isArray: boolean): [T, (data: T) => void] {
  const location = useLocation();
  const navigate = useNavigate();
  const values = querystring.parse(location.search);

  let value = values[name];
  if (isArray && !value?.length) value = [];
  if (!isArray && !value) value = '';

  const setValue = (newValue: T) => {
    const newValues = newValue ? { ...values, [name]: newValue } : omit(values, name);
    const query = querystring.stringify(newValues);

    navigate({ search: query ? `?${query}` : '' });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [value as any, setValue];
}
