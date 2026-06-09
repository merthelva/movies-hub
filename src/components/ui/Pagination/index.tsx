"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationPropsType } from "./component.type";
import { getPageNumbers } from "./get-page-numbers.util";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/Button";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationPropsType) => {
  if (totalPages <= 1 || currentPage > totalPages) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button
        aria-label="Previous page"
        className={styles.navBtn}
        disabled={isFirstPage}
        variant="ghost"
        onClick={onPageChange.bind(null, currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </Button>

      {pages[0] > 1 && (
        <>
          <Button
            className={styles.pageBtn}
            onClick={onPageChange.bind(null, 1)}
          >
            1
          </Button>
          {pages[0] > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          className={joinClassNames(
            styles.pageBtn,
            page === currentPage ? styles.active : "",
          )}
          onClick={onPageChange.bind(null, page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className={styles.ellipsis}>…</span>
          )}
          <Button
            className={styles.pageBtn}
            onClick={onPageChange.bind(null, totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        aria-label="Next page"
        className={styles.navBtn}
        disabled={isLastPage}
        variant="ghost"
        onClick={onPageChange.bind(null, currentPage + 1)}
      >
        <ChevronRight size={18} />
      </Button>
    </nav>
  );
};

export { Pagination };
