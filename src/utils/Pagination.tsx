import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected)}
      previousLabel=" →قبلی"
      nextLabel="بعدی ←"
      breakLabel="..."
      containerClassName="flex justify-center gap-2 mt-6 text-white"
      pageClassName="px-3 py-1 border border-gray-600 rounded-lg cursor-pointer"
      activeClassName="bg-blue-600 border-blue-600"
      previousClassName="px-3 py-1 border border-gray-600 rounded-lg"
      nextClassName="px-3 py-1 border border-gray-600 rounded-lg"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}
