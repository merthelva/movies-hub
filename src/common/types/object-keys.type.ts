type ObjectKeysType<T> = T extends Record<infer K, unknown> ? K : never;

export type { ObjectKeysType };
