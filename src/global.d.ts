import type { LocaleType } from "@/common/types/locale.type";

// Makes `useLocale()` / `getLocale()` return the exact locale union, so no
// `as LocaleType` casts are needed. The union is derived from `routing.locales`.
declare module "next-intl" {
  interface AppConfig {
    Locale: LocaleType;
  }
}
