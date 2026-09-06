"use client";

import { useLocale } from "next-intl";

import type { LocaleType } from "@/common/types/locale.type";
import { MultiSwitch } from "@/components/ui/MultiSwitch";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LanguageSwitcher = () => {
  const locale = useLocale() as LocaleType;
  const pathname = usePathname();

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    window.location.replace(`/${nextLocale}${pathname}`);
  };

  return (
    <MultiSwitch
      options={routing.locales.map((lang) => ({ value: lang, label: lang }))}
      value={locale}
      onChange={handleLocaleChange}
      aria-label="Select language"
    />
  );
};

export { LanguageSwitcher };
