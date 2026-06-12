import { apiService } from "@/services/api";
import type { QueryParamsType } from "@/features/movies/types/query-params.type";
import type { MovieCategoryType } from "@/features/movies/types/movie-category.type";
import type { MovieDetailsType } from "@/features/movies/types/movie.type";
import type { MovieCastType } from "@/features/movies/types/movie-cast.type";
import type { MovieTrailerType } from "@/features/movies/types/movie-trailer.type";
import type { PaginatedMoviesResponseType } from "@/features/movies/types/service-response.type";

const getMoviesByCategory = async (
  category: MovieCategoryType,
  params: QueryParamsType = {
    page: 1,
  },
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(params.page));
  const queryString = queryParams.toString();

  return await apiService<PaginatedMoviesResponseType>(
    `/movies/${category}${queryString ? `?${queryString}` : ""}`,
  );
};

const searchMovies = async (
  query: string,
  params: QueryParamsType = { page: 1 },
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("query", encodeURIComponent(query));
  queryParams.set("page", String(params.page));
  const queryString = queryParams.toString();

  return await apiService<PaginatedMoviesResponseType>(
    `/movies/search${queryString ? `?${queryString}` : ""}`,
  );
};

const getMovieDetails = async (movieId: number) => {
  return await apiService<MovieDetailsType>(`/movies/${movieId}/details`);
};

const getMovieCast = async (movieId: number) => {
  return await apiService<Array<MovieCastType>>(`/movies/${movieId}/cast`);
};

const getMovieTrailer = async (movieId: number) => {
  return await apiService<MovieTrailerType>(`/movies/${movieId}/trailer`);
};

export {
  getMoviesByCategory,
  searchMovies,
  getMovieDetails,
  getMovieCast,
  getMovieTrailer,
};
