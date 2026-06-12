import type { ArrayIndexToLiteralType } from "@/common/types/array-index-to-literal.type";
import type { MOVIE_CATEGORIES } from "@/features/movies/constants/movie-categories.constant";

type MovieCategoryType = ArrayIndexToLiteralType<typeof MOVIE_CATEGORIES>;

export type { MovieCategoryType };
