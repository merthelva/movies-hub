import type { MovieCardType } from "@/features/movies/types/movie.type";

type MovieCardPropsType = MovieCardType;

type ActionButtonsPropsType = {
  movieId: number;
};

export type { ActionButtonsPropsType, MovieCardPropsType };
