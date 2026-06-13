type PaginatedResponseType<TPageItem> = {
  isFirstPage: boolean;
  isLastPage: boolean;
  limit: number;
  page: number;
  items: Array<TPageItem>;
  totalItems: number;
};

export type { PaginatedResponseType };
