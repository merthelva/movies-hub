import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function UpcomingPage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query } = await searchParams;
  return (
    <MovieCategoryPageFactory category="upcoming" query={String(query ?? "")} />
  );
}
