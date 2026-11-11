import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { Language } from "@/common/constants/language.constant";
import { routing } from "@/i18n/routing";
import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function UpcomingPage({
  params,
  searchParams,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  const { query } = await searchParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <MovieCategoryPageFactory
      category="upcoming"
      lang={Language[locale]}
      query={String(query ?? "")}
    />
  );
}
