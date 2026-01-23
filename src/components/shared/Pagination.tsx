type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const canGoBack = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!canGoBack}
          className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!canGoNext}
          className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400"
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = index === page;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onPageChange(index)}
              className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'border border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-700'
              }`}
              style={{ cursor: isActive ? 'default' : 'pointer' }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
