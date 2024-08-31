import { useRef, useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import CardSkeleton from "../Skeletons/CardSkeleton";
import { FaStar, FaChevronCircleRight } from "../../utils/icons";
import { fetchTopRated } from "../../services/api";

const TopRatedSection = () => {
  const [topRatedData, setTopRatedData] = useState([]);
  const [mediaType, setMediaType] = useState("tv");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const trending = await fetchTopRated(mediaType);
        setTopRatedData(trending);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mediaType]);

  useEffect(() => {
    const fetchNexTwenty = async () => {
      try {
        const nextData = await fetchTopRated(mediaType, page);
        setTopRatedData([...topRatedData, ...nextData]);
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

  return (
    <>
      <div className="mt-4 flex items-center space-x-3 max-sm:space-x-8 p-4">
        <h2 className="flex items-center gap-1 font-bold text-xl max-sm:text-lg text-red-500">
          Top Rated
          <FaStar size={18} />
        </h2>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md max-sm:scale-110">
          <button
            className={`px-10 max-sm:px-8 py-1 rounded-full ${
              mediaType === "tv" ? "bg-red-600 text-slate-100 hover:scale-105" : "opacity-75"
            } transition-all duration-100 shrink-0`}
            onClick={() => setMediaType("tv") && setPage(1)}
          >
            Tv
          </button>
          <button
            className={`px-5 max-sm:px-4 rounded-full ${
              mediaType === "movie" ? "bg-red-600 text-slate-100 hover:scale-105" : "opacity-75"
            } transition-all duration-100 shrink-0`}
            onClick={() => setMediaType("movie") && setPage(1)}
          >
            Movies
          </button>
        </div>
      </div>
      <div
        className="flex items-center overflow-x-auto gap-5 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none"
        ref={containerRef}
      >
        {loading
          ? [...Array(20)].map((_, i) => <CardSkeleton key={i} small />)
          : topRatedData?.map((item) => {
              item["media_type"] = mediaType;
              return <CardComponent key={item.id} item={item} small />;
            })}
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

export default TopRatedSection;
