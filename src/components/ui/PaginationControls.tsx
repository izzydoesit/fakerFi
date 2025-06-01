"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}: Props): JSX.Element {
  return (
    <div className="sticky bottom-0 mt-4 bg-white p-2 border-t flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm px-3 py-1 border rounded disabled:opacity-30"
      >
        Previous
      </button>
      <span className="text-sm self-center">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm px-3 py-1 border rounded disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}
