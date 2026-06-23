import { Suspense } from "react";

import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import { MovieCategorySectionSkeleton } from "@/components/ui/Skeleton";
import { MovieSearchInput } from "@/features/movies/components/MovieSearchInput";
import { MovieSearchResults } from "@/features/movies/components/MovieSearchResults";

export default async function HomePage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query, page } = await searchParams;
  const searchQuery = typeof query === "string" ? query.trim() : "";
  const currentPage =
    typeof page === "string" && checkIsNumberString(page) ? +page : 1;

  return (
    <>
      <MovieSearchInput />
      <Suspense
        key={`${searchQuery}:${currentPage}`}
        fallback={<MovieCategorySectionSkeleton />}
      >
        <MovieSearchResults page={currentPage} query={searchQuery} />
      </Suspense>
    </>
  );
}
