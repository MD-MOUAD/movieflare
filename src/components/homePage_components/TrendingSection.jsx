import { useRef, useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import FeaturedMovie from "../FeaturedMovie";
import CardSkeleton from "../Skeletons/CardSkeleton";
import BannerSkeleton from "../Skeletons/BannerSkeleton";
import { IoIosTrendingUp, FaChevronCircleRight } from "../../utils/icons";
import { fetchTrending } from "../../services/api";
import Select from "react-select";
import selectStyles from "../../utils/selectStyles";

const TrendingSection = () => {
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("day");
  const [mediaType, setMediaType] = useState("all");
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, mediaType);
        setTrendingData(trending);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
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

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1 && page < 10) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page]);

  const mediaTypeOptions = [
    { value: "all", label: "All" },
    { value: "tv", label: "Tv Series" },
    { value: "movie", label: "Movies" },
  ];
  const handleTypeChange = (option) => {
    setPage(1);
    setMediaType(option.value);
  };
  return (
    <>
      {loading ? <BannerSkeleton /> : <FeaturedMovie item={trendingData[0]} />}
      <div className="mt-6 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Trending
          <IoIosTrendingUp size={25} />
        </h2>
        <Select
          id="mediaType"
          options={mediaTypeOptions}
          placeholder="All"
          className="text-black w-32 max-sm:hidden"
          onChange={handleTypeChange}
          styles={selectStyles}
        />
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-7 max-sm:px-5 rounded-full ${
              timeFrame === "day" ? "bg-red-600 text-slate-100 hover:scale-105" : "opacity-75"
            } transition-all duration-100 shrink-0`}
            onClick={() => setTimeFrame("day") && setPage(1)}
          >
            Today
          </button>
          <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${
              timeFrame === "week" ? "bg-red-600 text-slate-100 hover:scale-105" : "opacity-75"
            } transition-all duration-100 shrink-0`}
            onClick={() => setTimeFrame("week") && setPage(1)}
          >
            This Week
          </button>
        </div>
      </div>
      <div
        className="flex overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none"
        ref={containerRef}
      >
        {loading
          ? [...Array(19)].map((_, i) => <CardSkeleton key={i} small />)
          : trendingData?.map(
              (item, i) =>
                i > 0 && <CardComponent key={item.id} item={item} small />
            )}
        {page < 10 && (
          <button
            className="pr-2"
            onClick={() => page < 10 && setPage(page + 1)}
          >
            <FaChevronCircleRight size={30} className="mb-3" />
          </button>
        )}
      </div>
    </>
  );
};

export default TrendingSection;
