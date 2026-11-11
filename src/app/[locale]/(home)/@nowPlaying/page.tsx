import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function NowPlayingPage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query } = await searchParams;
  return (
    <MovieCategoryPageFactory
      category="now_playing"
      query={String(query ?? "")}
    />
  );
}
