export type AdapterInterface<I extends new (...args: any[]) => any> =
  InstanceType<I>;

export interface AdapterInstance {}
