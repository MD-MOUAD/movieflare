import { useState } from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalPages, onPageChange }) => {
  const [active, setActive] = useState(1);
  const pageLimit = 5; // Number of page buttons to show at a time
  const totalPagesMax500 = Math.min(totalPages, 500);
  const getPageRange = () => {
    let start = Math.max(1, active - Math.floor(pageLimit / 2));
    let end = Math.min(totalPagesMax500, active + Math.floor(pageLimit / 2));

    if (end - start + 1 < pageLimit) {
      if (start === 1) {
        end = Math.min(totalPagesMax500, start + pageLimit - 1);
      } else if (end === totalPagesMax500) {
        start = Math.max(1, end - pageLimit + 1);
      }
    }

    return { start, end };
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    className: `transition-colors duration-300 ${active === index ? 'bg-gray-700 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-800'} hover:bg-gray-300 dark:hover:bg-gray-700`,
    onClick: () => {
      setActive(index);
      onPageChange(index);
    },
  });

  const next = () => {
    if (active < totalPagesMax500) {
      setActive(active + 1);
      onPageChange(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
      onPageChange(active - 1);
    }
  };

  const { start, end } = getPageRange();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className={`flex items-center gap-2 ${active === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-800 dark:text-gray-200'} transition-opacity duration-300`}
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className={`h-4 w-4 ${active === 1 ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'}`} />
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {start > 1 && (
          <>
            <IconButton {...getItemProps(1)}>1</IconButton>
            {start > 2 && <span className="text-gray-800 dark:text-gray-200">...</span>}
          </>
        )}
        {Array.from({ length: end - start + 1 }, (_, index) => (
          <IconButton key={start + index} {...getItemProps(start + index)}>{start + index}</IconButton>
        ))}
        {end < totalPagesMax500 && (
          <>
            {end < totalPagesMax500 - 1 && <span className="text-gray-800 dark:text-gray-200">...</span>}
            <IconButton {...getItemProps(totalPagesMax500)}>{totalPagesMax500}</IconButton>
          </>
        )}
      </div>
      <Button
        variant="text"
        className={`flex items-center gap-2 ${active === totalPagesMax500 ? 'opacity-50 cursor-not-allowed' : 'text-gray-800 dark:text-gray-200'} transition-opacity duration-300`}
        onClick={next}
        disabled={active === totalPagesMax500}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className={`h-4 w-4 ${active === totalPagesMax500 ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'}`} />
      </Button>
    </div>
  );
};

export default Pagination;