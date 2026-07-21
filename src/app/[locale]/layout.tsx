import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Toaster } from "sonner";

import type { LocaleLayoutPropsType } from "./props.type";
import styles from "./styles.module.scss";

import "@/app/globals.scss";
import { AuthProvider } from "@/features/auth/context";
import { ThemeProvider } from "@/context/theme";
import { Header } from "@/components/Header";
import { MoveToTopButton } from "@/components/ui/MoveToTopButton";
import { routing } from "@/i18n/routing";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "800"],
});

export default async function LocaleLayout({
  children,
  modal,
  params,
}: LocaleLayoutPropsType) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations("Common");

  return (
    <html lang={locale} data-theme="dark">
      <body className={roboto.className}>
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <a href="#main-content" className={styles.skipLink}>
                {t("skipToMainContent")}
              </a>
              <Header />
              <main
                id="main-content"
                className={joinClassNames("fluid-wrapper", styles.main)}
              >
                {children}
              </main>
              <Toaster position="top-right" richColors />
              <MoveToTopButton />
              {modal}
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
