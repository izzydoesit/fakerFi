import { useMemo, useState } from "react";

export function usePagination<T>(items: T[] = [], pageSize = 5) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);

  const currentPageItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    return items.slice((page - 1) * pageSize, page * pageSize);
  }, [items, page, pageSize]);

  return {
    currentPageItems,
    currentPage: page,
    totalPages,
    setPage
  };
}
