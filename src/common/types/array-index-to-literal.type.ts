type ArrayIndexToLiteralType<TArray extends readonly unknown[]> =
  TArray[number];

export type { ArrayIndexToLiteralType };
