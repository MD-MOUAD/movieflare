import { useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import FeaturedMovie from "../FeaturedMovie";
import CardSkeleton from "../Skeletons/CardSkeleton";
import BannerSkeleton from "../Skeletons/BannerSkeleton";
import { IoIosTrendingUp, FaChevronCircleRight } from "../../utils/icons";
import { fetchTrending } from "../../services/api";

const TrendingSection = () => {
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("day");
  const [mediaType, setMediaType] = useState("all");
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, mediaType);
        setTrendingData(trending);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeFrame, mediaType]);

  useEffect(() => {
    const fetchNexTwenty = async () => {
      try {
        const nextData = await fetchTrending(timeFrame, mediaType, page);
        setTrendingData([...trendingData, ...nextData]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchNexTwenty();
  }, [page]);

  return (
    <>
      {loading ? <BannerSkeleton /> : <FeaturedMovie item={trendingData[0]} />}
      <div className="mt-6 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Trending
          <IoIosTrendingUp size={25} />
        </h2>
        <select
          id="mediaType"
          className="bg-gray-300 dark:bg-zinc-900 dark:text-gray-300 py-2 px-1 rounded-md max-sm:hidden"
          onChange={(e) => setMediaType(e.target.value) && setPage(1)}
          defaultValue={"all"}
        >
          <option value="all">all</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-5 max-sm:px-2 rounded-full ${
              timeFrame === "day" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTimeFrame("day") && setPage(1)}
          >
            Today
          </button>
          <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${
              timeFrame === "week" ? "bg-red-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTimeFrame("week") && setPage(1)}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none">
        {loading
          ? [...Array(19)].map((_, i) => <CardSkeleton key={i} />)
          : trendingData?.map(
              (item, i) => i > 0 && <CardComponent key={item.id} item={item} />
            )}
        {page < 10 && (
          <button
            className="pr-2"
            onClick={() => page < 10 && setPage(page + 1)}
          >
            <FaChevronCircleRight size={30} />
          </button>
        )}
      </div>
    </>
  );
};

export default TrendingSection;
