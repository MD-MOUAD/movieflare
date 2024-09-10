import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import CardComponent from "../components/CardComponent";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import { genresDict } from "../services/api";
import HomeRedirection from "../components/HomeRedirection";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { moviesGenreIcons } from "../utils/icons";

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [totalPages, setTotalPage] = useState(1);
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    if (!Object.keys(genresDict["movie"]).includes(id)) {
      setError(true);
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page, id, sortOption, language);
        const nextPageData = await fetchMovies(
          page + 1,
          id,
          sortOption,
          language
        );
        setMovies([...data?.results, ...nextPageData?.results]);
        setTotalPage(data?.total_pages);
      } catch (err) {
        console.log("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortOption, page, id, language]);

  if (error) {
    return <HomeRedirection />;
  }

  return (
    <div className="py-2">
      <div
        className={`flex items-center justify-center gap-2 text-base sm:text-xl font-bold text-red-500 py-2 sm:py-4 px-2 sm:px-10 sm:mb-4`}
      >
        <div className={`flex gap-1 items-center`}>
          <h2>
            {`${t("discoverMovies")}:`}
            <span className="lowercase text-gray-800 dark:text-gray-400 text-sm sm:text-lg">
              {" "}
              {`${t("Genre")} ${t(genresDict["movie"][id])}`}
            </span>
          </h2>
          {React.createElement(
            moviesGenreIcons.find((genre) => genre.id === id)?.icon,
            {
              className: "text-gray-800 dark:text-gray-400 size-5 sm:size-8",
            }
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
        {loading ? (
          [...Array(40)].map((_, i) => <CardSkeleton key={i} />)
        ) : movies?.length > 0 ? (
          movies?.map((item, i) => {
            item["media_type"] = "movie";
            return <CardComponent key={i} item={item} />;
          })
        ) : (
          <p className="mt-10 text-center">{t("noData")}</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-12">
        {totalPages > 1 && movies?.length > 0 && (
          <Pagination totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default GenrePage;
