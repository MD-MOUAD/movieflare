import CardComponent from "../components/CardComponent";
import Skeleton from "../components/Skeleton";
import { useState, useEffect } from "react";
import { fetchTrending } from "../services/api";
import fakeTrendingData from "../data/data";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [timeInterval, setTimeInterval] = useState("day");

  // useEffect(() => {
  //   fetchTrending(timeInterval)
  //     .then((results) => {
  //       setData(results);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     });
  // }, [timeInterval]);

  // use fake data
  useEffect(() => {
    setData(fakeTrendingData(timeInterval));
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [timeInterval]);

  return (
    <div className="py-4 px-6">
      <div className="flex items:center space-x-3 py-4">
        <h2 className="uppercase text-xl">Trending</h2>
        <select className="bg-zinc-900 text-gray-300 p-1 rounded-md">
          <option value="all">all</option>
          <option value="movies">Movies</option>
          <option value="shows">TV Shows</option>
        </select>
        <div className="flex border-4 border-white/5 rounded-full">
          <button 
            className={`px-5 rounded-full ${timeInterval == "day" ?"bg-zinc-900" : ""} transition-all duration-300`}
            onClick={() => setTimeInterval("day")}
          >
            Today
          </button>
          <button 
            className={`px-5 rounded-full ${timeInterval == "week" ?"bg-zinc-900" : ""} transition-all duration-300`}
            onClick={() => setTimeInterval("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-5 py-3">
        {data?.map((item, index) =>
          loading ? (
            <Skeleton key={index} />
          ) : (
            <CardComponent key={item.id} item={item} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
