const BannerSkeleton = () => {
  return (
    <div className="py-9 px-1 sm:p-6 md:p-12 bg-gray-300 rounded-md animate-pulse">
      <div className="flex gap-2 items-center max-w-7xl">
        <div className="flex justify-center items-center aspect-card w-28 md:w-48 rounded-lg shrink-0 bg-gray-200 dark:bg-gray-400 animate-pulse max-sm:hidden">
        </div>
        <div className="flex flex-col gap-6 w-full px-6">
          <div className="bg-gray-200 dark:bg-gray-400 rounded-md h-8 w-6/12"></div>
          <div className="bg-gray-200 dark:bg-gray-400 rounded-md h-7 w-3/12 max-md:hidden"></div>
          <div className="bg-gray-200 dark:bg-gray-400 rounded-md h-7 w-4/12 max-md:hidden"></div>
          <div className="bg-gray-200 dark:bg-gray-400 rounded-md h-14 w-9/12 max-md:hidden"></div>
          <div className="bg-gray-200 dark:bg-gray-400 rounded-md h-8 w-2/12"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
