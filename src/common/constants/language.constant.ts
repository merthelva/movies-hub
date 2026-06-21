import type { LanguageType } from "@/common/types/language.type";
import type { LocaleType } from "@/common/types/locale.type";

const Language = {
  en: "en-US",
  tr: "tr-TR",
} satisfies Record<LocaleType, LanguageType>;

export { Language };
