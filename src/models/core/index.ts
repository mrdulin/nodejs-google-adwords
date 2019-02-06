type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] };

export { Omit };
