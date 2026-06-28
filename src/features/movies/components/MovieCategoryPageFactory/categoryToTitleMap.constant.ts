import type { MovieCategoryType } from "@/features/movies/types/movie-category.type";

const categoryToTitleMap = {
  now_playing: "nowPlaying",
  popular: "popular",
  top_rated: "topRated",
  upcoming: "upcoming",
} satisfies Record<MovieCategoryType, string>;

export { categoryToTitleMap };
