import type { deleteMovieFromUserFavoritelist } from "@/features/user-lists/services";

type DeleteMovieFromUserListButtonPropsType = {
  listId: number;
  movieId: number;
  onDeleteMovieFromUserList: typeof deleteMovieFromUserFavoritelist;
};

export type { DeleteMovieFromUserListButtonPropsType };
