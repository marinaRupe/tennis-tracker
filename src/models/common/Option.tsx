export interface Option<T extends string | number = string | number> {
  readonly key: string | number;
  readonly value: T;
  readonly displayName: string;
}
