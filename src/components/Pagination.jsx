import { useEffect, useState } from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
const Pagination = ({ totalPages, onPageChange }) => {
  const {t} = useTranslation();
  const [active, setActive] = useState(1);
  const pageLimit = 4; // Number of page buttons to show at a time
  const totalPagesMax250 = Math.min(Math.ceil(totalPages / 2), 250);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  useEffect(() => {
    setActive(1);
    onPageChange(1);
    window.scrollTo(0, 0);
  }, [totalPages]);

  const getPageRange = () => {
    let start = Math.max(1, active - Math.floor(pageLimit / 2));
    let end = Math.min(totalPagesMax250, active + Math.floor(pageLimit / 2));

    if (end - start + 1 < pageLimit) {
      if (start === 1) {
        end = Math.min(totalPagesMax250, start + pageLimit - 1);
      } else if (end === totalPagesMax250) {
        start = Math.max(1, end - pageLimit + 1);
      }
    }

    return { start, end };
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    className: `flex items-center justify-center transition-colors duration-300 ${active === index ? 'bg-gray-700 dark:bg-red-600  font-bold' : 'bg-gray-200 dark:bg-transparent'} ${active !== index && "hover:bg-gray-300 dark:hover:bg-gray-600"}`,
    onClick: () => {
      setActive(index);
      onPageChange((2 * index) - 1);
    },
  });

  const next = () => {
    if (active < totalPagesMax250) {
      setActive(active + 1);
      onPageChange(2 * (active + 1) - 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
      onPageChange(2 * (active - 1) - 1);
    }
  };

  const { start, end } = getPageRange();

  return (
    <div className="flex items-center sm:gap-4 py-2 max-sm:scale-75 mb-6">
      <Button
        variant="text"
        className={`flex items-center gap-1 sm:gap-2 ${active === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-800 dark:text-gray-200'} transition-opacity duration-300`}
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className={`h-4 w-4 ${active === 1 ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'}`} />
        {t('previous')}
      </Button>
      <div className="flex items-center gap-1 sm:gap-2">
        {start > 1 && (
          <>
            <IconButton {...getItemProps(1)}>1</IconButton>
            {start > 2 && <span className="text-gray-800 dark:text-gray-200">...</span>}
          </>
        )}
        {Array.from({ length: end - start + 1 }, (_, index) => (
          <IconButton key={start + index} {...getItemProps(start + index)}>{start + index}</IconButton>
        ))}
        {end < totalPagesMax250 && (
          <>
            {end < totalPagesMax250 - 1 && <span className="text-gray-800 dark:text-gray-200">...</span>}
            <IconButton {...getItemProps(totalPagesMax250)}>{totalPagesMax250}</IconButton>
          </>
        )}
      </div>
      <Button
        variant="text"
        className={`flex items-center gap-1 sm:gap-2 ${active === totalPagesMax250 ? 'opacity-50 cursor-not-allowed' : 'text-gray-800 dark:text-gray-200'} transition-opacity duration-300`}
        onClick={next}
        disabled={active === totalPagesMax250}
      >
        {t('next')}
        <ArrowRightIcon strokeWidth={2} className={`h-4 w-4 ${active === totalPagesMax250 ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'}`} />
      </Button>
    </div>
  );
};

export default Pagination;