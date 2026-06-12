"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";

import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import { Pagination } from "@/components/ui/Pagination";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { SearchMoviesPaginationPropsType } from "./component.type";

const SearchedMoviesPagination = ({
  totalPages,
}: SearchMoviesPaginationPropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  searchParamsRef.current = searchParams;

  const pageParam = searchParamsRef.current.get("page");
  const currentPage =
    pageParam && checkIsNumberString(pageParam) ? +pageParam : 1;

  const handleChangePage = (page: number) => {
    const query = new URLSearchParams(searchParamsRef.current.toString());
    query.set("page", String(page));
    const queryString = query.toString().toLowerCase();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handleChangePage}
    />
  );
};

export { SearchedMoviesPagination };
