import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function PopularPage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query } = await searchParams;
  return (
    <MovieCategoryPageFactory category="popular" query={String(query ?? "")} />
  );
}
