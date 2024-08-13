import React from "react";
import CardComponent from "../CardComponent";
import CardSkeleton from "../Skeletons/CardSkeleton";
import { FaStar, FaChevronCircleRight } from "../../utils/icons";

const TopRatedSection = ({ topRatedLoading, topRatedData, topRatedType, setTopRatedType }) => {
  return (
    <>
      <div className="mt-4 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Top Rated
          <FaStar size={18} />
        </h2>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-5 max-sm:px-4 rounded-full ${topRatedType === "movie" ? "bg-red-600 text-slate-100" : ""} transition-all duration-300 shrink-0`}
            onClick={() => setTopRatedType("movie")}
          >
            Movies
          </button>
          <button
            className={`px-10 max-sm:px-8 py-1 rounded-full ${topRatedType === "tv" ? "bg-red-600 text-slate-100" : ""} transition-all duration-300 shrink-0`}
            onClick={() => setTopRatedType("tv")}
          >
            Tv
          </button>
        </div>
      </div>
      <div className="flex items-center overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none">
        {topRatedLoading
          ? [...Array(20)].map((_, i) => <CardSkeleton key={i} />)
          : topRatedData?.map((item) => {
              item["media_type"] = topRatedType;
              return <CardComponent key={item.id} item={item} />;
            })}
        <button className="pr-2">
          <FaChevronCircleRight size={40} />
        </button>
      </div>
    </>
  );
};

export default TopRatedSection;
