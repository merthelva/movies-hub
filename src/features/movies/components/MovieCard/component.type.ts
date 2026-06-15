import type { MovieCardType } from "@/features/movies/types/movie.type";
import type { DeleteMovieFromUserListButtonPropsType } from "@/features/movies/components/DeleteMovieFromUserListButton/component.type";

type MovieCardPropsType = MovieCardType &
  (
    | {
        variant: "public";
      }
    | ({
        variant: "protected";
      } & DeleteMovieFromUserListButtonPropsType)
  );

export type { MovieCardPropsType };
