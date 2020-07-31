/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react';
import { SelectProps } from 'antd/lib/select';
import { useField } from 'formik';

import { CFC } from '@/typings/components';

export function selectToFormikSelect<T extends SelectProps<any>>(Component: CFC<T>) {
  return ({ name, ...props }: ComponentProps<typeof Component> & { name: string }) => {
    const [field, , helpers] = useField<T['value']>(name);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Component onSelect={v => helpers.setValue(v as any)} onBlur={field.onBlur} value={field.value} {...props} />
    );
  };
}
