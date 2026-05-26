import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { PropsWithChildren } from "react";

import "../globals.scss";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { routing } from "@/i18n/routing";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "800"],
});

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<LayoutProps<"/[locale]">>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-theme="dark">
      <body className={roboto.className}>
        <NextIntlClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
