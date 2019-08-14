type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] };

type ID = string | number;

type StringOrNull = string | null;

export { Omit, ID, StringOrNull };
