/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react';
import { SelectProps } from 'antd/lib/select';
import { useField } from 'formik';

import { CFC } from '@/typings/components';

export function selectToFormikSelect<T extends SelectProps<any>>(Component: CFC<T>) {
  return ({ name, ...props }: ComponentProps<typeof Component> & { name: string }) => {
    const [field, , helpers] = useField<T['value']>(name);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component onBlur={field.onBlur} value={field.value} {...props} onChange={helpers.setValue} />;
  };
}
