import CardComponent from "../components/CardComponent";
import CoverComponent from "../components/CoverComponent";
import Skeleton from "../components/Skeleton";
import { useState, useEffect } from "react";
import { fetchTrending } from "../services/api";
import fakeTrendingData from "../data/data";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [timeInterval, setTimeInterval] = useState("day");
  const [mediaType, setMediaType] = useState("all");

  // useEffect(() => {
  //   setLoading(true);
  //   fetchTrending(timeInterval, mediaType)
  //     .then((results) => {
  //       setData(results);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [timeInterval, mediaType]);

  // use fake data

  useEffect(() => {
    setLoading(true);
    setData(fakeTrendingData(timeInterval));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [timeInterval]);

  return (
    <div className="py-1">
      {data?.length > 0 && <CoverComponent item={data[0]} />}
      <div className="flex items-center space-x-3 py-4 px-4">
        <h2 className="uppercase text-xl max-sm:text-lg">Trending</h2>
        <select
          id="mediaType"
          className="bg-gray-300 dark:bg-zinc-900 dark:text-gray-300 py-2 px-1 rounded-md"
          onChange={(e) => setMediaType(e.target.value)}
          defaultValue={"all"}
        >
          <option value="all">all</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="flex border border-black dark:border-white rounded-full shadow-md">
          <button
            className={`px-5 max-sm:px-2 rounded-full ${
              timeInterval == "day" ? "bg-cyan-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTimeInterval("day")}
          >
            Today
          </button>
          <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${
              timeInterval == "week" ? "bg-cyan-600 text-slate-100" : ""
            } transition-all duration-300 shrink-0`}
            onClick={() => setTimeInterval("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none">
        {loading
          ? [...Array(19)].map((_, i) => <Skeleton key={i} />)
          : data?.map(
              (item, i) => i > 0 && <CardComponent key={item.id} item={item} />
            )}
      </div>
    </div>
  );
};

export default Home;
