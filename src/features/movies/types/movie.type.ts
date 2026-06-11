type MovieCardType = {
  tmdbId: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
};

type MovieDetailsType = MovieCardType & {
  budget: number;
  genres: Array<string>;
  revenue: number;
  runtime: number;
  voteCount: number;
};

export type { MovieCardType, MovieDetailsType };
