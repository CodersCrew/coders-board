import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import loglevel from 'loglevel';

type Messages<R> = {
  loading?: (() => string) | string;
  success?: ((result: R) => string) | string;
  failure?: ((ex: ApolloError) => string) | string;
};

const displayMessage = <T>(
  type: 'loading' | 'success' | 'error',
  param: T,
  messageContent?: ((p: T) => string) | string,
) => {
  if (!messageContent) return;

  if (typeof messageContent === 'string') {
    message[type](messageContent, type === 'loading' ? 0 : undefined);
  } else {
    message[type](messageContent(param));
  }
};

export const runMutation = async <
  R,
  A extends Promise<R>,
  S extends (result: R) => void,
  F extends (ex: ApolloError) => void,
  D extends () => void,
  M extends Messages<R>
>(fc: {
  mutation: A;
  success?: S;
  failure?: F;
  finally?: D;
  messages?: M;
}) => {
  displayMessage('loading', undefined, fc.messages?.loading);

  try {
    const result = await fc.mutation;
    displayMessage('success', result, fc.messages?.success);
    if (fc.success) fc.success(result);
  } catch (ex) {
    loglevel.error(ex);
    displayMessage('error', ex, fc.messages?.failure);
    if (fc.failure) fc.failure(ex);
  } finally {
    if (fc.finally) fc.finally();
  }
};
