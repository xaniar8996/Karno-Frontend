import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({
  items,
  itemsPerPage = 7,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    pageCount,
  };
}
