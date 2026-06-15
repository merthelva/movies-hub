"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";

import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import { Pagination } from "@/components/ui/Pagination";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { UrlPaginationPropsType } from "./component.type";

const UrlPagination = ({ totalPages }: UrlPaginationPropsType) => {
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
      totalPages={Math.min(totalPages, 500)}
      onPageChange={handleChangePage}
    />
  );
};

export { UrlPagination };
