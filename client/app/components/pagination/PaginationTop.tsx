"use client";

interface PaginationTopProps {
  total: number;
  current_page: number;
  properties_per_page: number;
}

const PaginationTop: React.FC<PaginationTopProps> = ({
  total,
  current_page,
  properties_per_page,
}) => {
  let properties_from = properties_per_page * (current_page - 1) + 1;
  let properties_to = properties_from + properties_per_page - 1;
  if (properties_to > total) {
    properties_to = total;
  }

  return (
    <div className="flex items-center justify-end border-gray-200  px-2 py-1 sm:px-6">
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-medium">{properties_from}件</span>
          から
          <span className="font-medium">{properties_to}件</span>
          の物件表示 (合計<span className="font-medium">{total}</span>件)
        </p>
      </div>
    </div>
  );
};

export default PaginationTop;
