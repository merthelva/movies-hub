type TmdbPaginatedResponseType<TPageItem> = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Array<TPageItem>;
};

export type { TmdbPaginatedResponseType };
