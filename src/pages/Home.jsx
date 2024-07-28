import CardComponent from "../components/CardComponent";
import { useState, useEffect } from "react";
import { fetchTrending } from "../services/api";
import fakeData from "../data/data";

const Home = () => {
  const [data, setData] = useState(fakeData);
  const [timeInterval, setTimeInterval] = useState("day");

  // useEffect(() => {
  //   fetchTrending(timeInterval)
  //     .then((results) => {
  //       setData(results);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     });
  // }, [timeInterval]);

  return (
    <div className="py-4 px-6">
      <h2 className="uppercase text">Trending</h2>
      <div className="flex overflow-x-auto gap-5 py-3">
        {data?.map((item, index) => index <5 &&(
          <CardComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
