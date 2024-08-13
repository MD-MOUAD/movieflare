import { useState, useEffect } from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import BannerSkeleton from "../components/Skeletons/BannerSkeleton";
import TrendingSection from "../components/home/TrendingSection";
import TopRatedSection from "../components/home/TopRatedSection";
import { fetchTopRated, fetchTrending } from "../services/api";

const Home = () => {
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [trendingData, setTrendingData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");
  const [trendingType, setTrendingType] = useState("all");
  const [topRatedData, setTopRatedData] = useState([]);
  const [topRatedType, setTopRatedType] = useState("movie");

  useEffect(() => {
    setTrendingLoading(true);
    const fetchTrendingData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, trendingType);
        setTrendingData(trending);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrendingData();
  }, [timeFrame, trendingType]);

  useEffect(() => {
    setTopRatedLoading(true);
    const fetchTopRatedData = async () => {
      try {
        const trending = await fetchTopRated(topRatedType);
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
      <TrendingSection
        trendingLoading={trendingLoading}
        trendingData={trendingData}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        trendingType={trendingType}
        setTrendingType={setTrendingType}
      />
      <TopRatedSection
        topRatedLoading={topRatedLoading}
        topRatedData={topRatedData}
        topRatedType={topRatedType}
        setTopRatedType={setTopRatedType}
      />
    </div>
  );
};

export default Home;
