import CardComponent from "../components/CardComponent";
import FeaturedMovie from "../components/FeaturedMovie";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import BannerSkeleton from "../components/Skeletons/BannerSkeleton";
import { useState, useEffect } from "react";
import { fetchTrending } from "../services/api";
import fakeTrendingData from "../data/data";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [trendingData, setTrendingData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");
  const [mediaType, setMediaType] = useState("all");

  useEffect(() => {
    setLoading(true);
    const fetchTrendingData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, mediaType);

        // Set trendingData
        setTrendingData(trending);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingData();

  }, [timeFrame, mediaType]);

  // use fake data

  // useEffect(() => {
  //   setLoading(true);
  //   setData(fakeTrendingData(timeFrame));
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, [timeFrame]);

  return (
    <div className="py-1 sm:p-4">
      {loading
        ? <BannerSkeleton/>
        : <FeaturedMovie item={trendingData[0]} />
      }
      <div className="flex items-center space-x-3 max-sm:space-x-8 py-4 px-4">
        <h2 className="font-bold text-xl max-sm:text-lg text-red-500">Trending</h2>
        <select
          id="mediaType"
          className="bg-gray-300 dark:bg-zinc-900 dark:text-gray-300 py-2 px-1 rounded-md max-sm:hidden"
          onChange={(e) => setMediaType(e.target.value)}
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
        {loading
          ? [...Array(19)].map((_, i) => <CardSkeleton key={i} />)
          : trendingData?.map(
              (item, i) => i > 0 && <CardComponent key={item.id} item={item} />
            )}
      </div>
    </div>
  );
};

export default Home;
