/* eslint-disable @typescript-eslint/ban-types */
import { PropsWithChildren, ReactElement, Ref, ValidationMap } from 'react';

/**
 * React component with no children.
 */
type ChildlessFunctionComponent<P = {}, C = {}> = {
  (props: P, context?: C): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

/**
 * React component with no children.
 */
export type CFC<P = {}> = ChildlessFunctionComponent<P>;

/**
 * React component which takes and displays children.
 */
type FunctionComponent<P = {}, C = {}> = {
  (props: PropsWithChildren<P>, context?: C): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

/**
 * React component which takes and displays children.
 */
export type FC<P = {}> = FunctionComponent<P>;

/**
 * React component which takes a reference to returned element.
 */
type RefForwardingComponent<T, P = {}, C = {}> = {
  (props: PropsWithChildren<P>, ref: Ref<T>): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

/**
 * React component which takes a reference to returned element.
 */
export type RFC<T, P = {}> = RefForwardingComponent<T, P>;
