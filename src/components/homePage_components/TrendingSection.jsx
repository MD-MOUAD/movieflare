import { useRef, useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import CardSkeleton from "../Skeletons/CardSkeleton";
import BannerSkeleton from "../Skeletons/BannerSkeleton";
import { IoIosTrendingUp, FaChevronCircleRight } from "../../utils/icons";
import { fetchTrending } from "../../services/api";
import { Select } from "@chakra-ui/react";
import BannerSlider from "../BannerSlider";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

const TrendingSection = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("week");
  const [mediaType, setMediaType] = useState("movie");
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const trending = await fetchTrending(timeFrame, mediaType, 1, language);
        setTrendingData(trending);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [timeFrame, mediaType, language]);

  useEffect(() => {
    const fetchNexTwenty = async () => {
      try {
        const nextData = await fetchTrending(timeFrame, mediaType, page, language);
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
    { value: "movie", label: "Movies" },
    { value: "tv", label: "Tv Series" },
  ];
  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setPage(1);
    setMediaType(selectedValue);
  };

  return (
    <>
      {loading ? (
        <BannerSkeleton />
      ) : (
        <BannerSlider movies={trendingData?.slice(0, 5)} />
      )}
      <div className={`mt-2 flex items-center gap-3 p-4 max-sm:px-1`}>
        <h2 className={`flex items-center gap-1 font-bold text-base sm:text-xl text-red-500 $`}>
          {t("trending")}
          <IoIosTrendingUp className="size-5 sm:size-8" />
        </h2>
        <div className="max-sm:hidden">
          <Select
            id="mediaType"
            onChange={handleTypeChange}
            w={"8rem"}
            h={"2.4rem"}
            rounded={"lg"}
            variant="outline"
            focusBorderColor="red.500"
          >
            {mediaTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex font-[500] border-2 border-black/50 dark:border-white/50 rounded-full shadow-md">
        <button
            className={`px-5 max-sm:px-2 py-1 rounded-full ${
              timeFrame === "week"
                ? "bg-red-600 text-slate-100 hover:scale-105"
                : "opacity-75"
              } transition-all duration-100 shrink-0`}
              onClick={() => setTimeFrame("week") && setPage(1)}
          >
            {t('thisWeek')}
          </button>
          <button
            className={`px-7 max-sm:px-5 rounded-full ${
              timeFrame === "day"
                ? "bg-red-600 text-slate-100 hover:scale-105"
                : "opacity-75"
            } transition-all duration-100 shrink-0`}
            onClick={() => setTimeFrame("day") && setPage(1)}
          >
            {t('today')}
          </button>
        </div>
      </div>
      <div
        className={`flex items-center overflow-x-auto gap-5 max-sm:gap-3 pt-3 pb-5 px-1 mx-4 max-sm:py-1 max-sm:mx-0 max-sm:scrollbar-none`}
        ref={containerRef}
      >
        {loading
          ? [...Array(15)].map((_, i) => <CardSkeleton key={i} small />)
          : trendingData?.map(
              (item, i) =>
                i > 4 && <CardComponent key={item.id} item={item} small />
            )}
        {page < 10 && (
          <button
            className="px-2"
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
