import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import "../globals.scss";
import { AuthProvider } from "@/features/auth/context";
import { ThemeProvider } from "@/context/theme";
import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
import type { LocaleLayoutPropsType } from "./props.type";
import styles from "./styles.module.scss";

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

  return (
    <html lang={locale} data-theme="dark">
      <body className={roboto.className}>
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <Header />
              <main className={styles.main}>{children}</main>
              {modal}
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
