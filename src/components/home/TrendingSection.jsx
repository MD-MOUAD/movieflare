import React from "react";
import CardComponent from "../CardComponent";
import CardSkeleton from "../Skeletons/CardSkeleton";
import { IoIosTrendingUp } from "../../utils/icons";

const TrendingSection = ({ trendingLoading, trendingData, timeFrame, setTimeFrame, trendingType, setTrendingType }) => {
  return (
    <>
      <div className="mt-6 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Trending
          <IoIosTrendingUp size={25} />
        </h2>
        <select
          id="mediaType"
          className="bg-gray-300 dark:bg-zinc-900 dark:text-gray-300 py-2 px-1 rounded-md max-sm:hidden"
          onChange={(e) => setTrendingType(e.target.value)}
          defaultValue={"all"}
        >
          <option value="all">all</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-5 max-sm:px-2 rounded-full ${timeFrame === "day" ? "bg-red-600 text-slate-100" : ""} transition-all duration-300 shrink-0`}
            onClick={() => setTimeFrame("day")}
          >
            Today
          </button>
          <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${timeFrame === "week" ? "bg-red-600 text-slate-100" : ""} transition-all duration-300 shrink-0`}
            onClick={() => setTimeFrame("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none">
        {trendingLoading
          ? [...Array(19)].map((_, i) => <CardSkeleton key={i} />)
          : trendingData?.map(
              (item, i) => i > 0 && <CardComponent key={item.id} item={item} />
            )}
      </div>
    </>
  );
};

export default TrendingSection;
