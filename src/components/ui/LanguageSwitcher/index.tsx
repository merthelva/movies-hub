"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { joinClassNames } from "@/common/utils/join-classnames.util";
import { Button } from "@/components/ui/Button";

import styles from "./styles.module.scss";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className={styles.switcher}>
      {routing.locales.map((lang) => (
        <Button
          key={lang}
          variant="ghost"
          className={joinClassNames(
            styles.langBtn,
            locale === lang ? styles.active : "",
          )}
          aria-label={`Switch to ${lang} language`}
          aria-pressed={locale === lang}
          onClick={() => handleLocaleChange(lang)}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
};

export { LanguageSwitcher };
