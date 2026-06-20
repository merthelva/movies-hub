"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { MultiSwitch } from "@/components/ui/MultiSwitch";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
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
