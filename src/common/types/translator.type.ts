import type { getTranslations } from "next-intl/server";

type TranslatorType<TKey extends string> = Awaited<
  ReturnType<typeof getTranslations<TKey>>
>;

export type { TranslatorType };
