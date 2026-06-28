import type { LanguageType } from "@/common/types/language.type";
import type { MovieCategoryType } from "@/features/movies/types/movie-category.type";

type MovieCategoryPageFactoryPropsType = {
  query: string;
  category: MovieCategoryType;
  lang: LanguageType;
};

export type { MovieCategoryPageFactoryPropsType };
