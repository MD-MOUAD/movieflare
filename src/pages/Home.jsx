import CardComponent from "../components/CardComponent";
import FeaturedMovie from "../components/FeaturedMovie";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import BannerSkeleton from "../components/Skeletons/BannerSkeleton";
import { useState, useEffect } from "react";
import { fetchTopRated, fetchTrending } from "../services/api";
import { IoIosTrendingUp, FaStar, FaChevronCircleRight } from "../utils/icons";

const Home = () => {
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [trendingData, setTrendingData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");
  const [trendingType, setTrendingType] = useState("all");
  const [topRatedData, setTopRatedData] = useState([]);
  const [topRatedType, setTopRatedType] = useState("movie");

  // Trending
  useEffect(() => {
    setTrendingLoading(true);
    const fetchTrendingData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, trendingType);
        // Set trendingData
        setTrendingData(trending);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrendingData();
  }, [timeFrame, trendingType]);

  // Top Rated
  useEffect(() => {
    setTopRatedLoading(true);
    const fetchTopRatedData = async () => {
      try {
        const trending = await fetchTopRated(topRatedType);
        // Set top Rated data
        setTopRatedData(trending);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setTopRatedLoading(false);
      }
    };
    fetchTopRatedData();
  }, [topRatedType]);

  return (
    <div className="py-1 sm:p-4">
      {trendingLoading ? (
        <BannerSkeleton />
      ) : (
        <FeaturedMovie item={trendingData[0]} />
      )}
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
            className={`px-5 max-sm:px-2 rounded-full ${
              timeFrame == "day" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTimeFrame("day")}
          >
            Today
          </button>
          <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${
              timeFrame == "week" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
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
      <div className="mt-4 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Top Rated
          <FaStar size={18} />
        </h2>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-5 max-sm:px-4 rounded-full ${
              topRatedType == "movie" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTopRatedType("movie")}
          >
            Movies
          </button>
          <button
            className={`px-10 max-sm:px-8 py-1 rounded-full ${
              topRatedType == "tv" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
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
        <button className="pr-2"><FaChevronCircleRight size={40} /></button>
      </div>
    </div>
  );
};

export default Home;
