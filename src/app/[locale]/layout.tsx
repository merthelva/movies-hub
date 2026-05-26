import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { PropsWithChildren } from "react";

import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<LayoutProps<"/[locale]">>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
