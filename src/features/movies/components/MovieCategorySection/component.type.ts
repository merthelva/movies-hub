import type { MovieCardType } from "@/features/movies/types/movie.type";

type MovieCategorySectionPropsType = {
  title: string;
  movies: Array<MovieCardType>;
  viewMoreHref: string;
  viewMoreLabel: string;
};

export type { MovieCategorySectionPropsType };
