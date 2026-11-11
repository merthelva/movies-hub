// Public TMDB-backed reads change rarely. Cache them in the Next.js data cache

import type { MovieCategoryType } from "@/features/movies/types/movie-category.type";

// and let the tags allow targeted invalidation with `revalidateTag` later.
const MOVIE_REVALIDATE_SECONDS = 60 * 60;

const MOVIE_CACHE_TAGS = {
  all: "movies",
  category: (category: MovieCategoryType) => `movies:category:${category}`,
  movie: (movieId: number) => `movies:movie:${movieId}`,
} as const;

export { MOVIE_REVALIDATE_SECONDS, MOVIE_CACHE_TAGS };
