import { AggregateRootProps } from '@shared/domain';
import { AdapterInstance, AdapterInterface } from '../../constants/types';

export interface ToDomain<T, U extends AggregateRootProps> {
  new (...args: any[]): AdapterInstance;
  adapt(data: T): U;
}

export interface FromDomain<T extends AggregateRootProps, U> {
  new (...args: any[]): AdapterInstance;
  adapt(data: T): U;
}

export type ApplicationAdapter<I extends new (...args: any[]) => any> =
  AdapterInterface<I>;
