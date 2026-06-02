type ObjectValuesType<T> = T extends Record<PropertyKey, infer V> ? V : never;

export type { ObjectValuesType };
