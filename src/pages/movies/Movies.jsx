import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import Pagination from "../../components/Pagination";
import FilterComponent from "../../components/FilterComponent";
import { FaFilm, FaFilter } from "../../utils/icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [totalPages, setTotalPage] = useState(1);
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page, genre, sortOption, language);
        const nextPageData = await fetchMovies(page + 1, genre, sortOption, language);
        setMovies([...data?.results, ...nextPageData?.results]);
        setTotalPage(data?.total_pages);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [genre, sortOption, page, language]);

  return (
    <div className="container mx-auto py-2">
      <section id="filter" className="mb-5">
        <div className="px-1 sm:px-20">
          <div className={`flex justify-between items-center ${language == "ar-MA" &&"flex-row-reverse"}`}>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-4">
              <h2>{t("discoverMovies")}</h2>
              <FaFilm size={22} />
            </div>
            <button
              onClick={() => {
                document.querySelector(".filter").classList.toggle("hidden");
              }}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105"
            >
              <FaFilter />
              {t('filter')}
            </button>
          </div>
          <FilterComponent
            setGenre={setGenre}
            setSort={setSortOption}
            mediaType={"movie"}
            resetPage={setPage}
          />
        </div>
      </section>
      <div className="flex items-center justify-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
        {loading ? (
          [...Array(20)].map((_, i) => <CardSkeleton key={i} />)
        ) : movies.length > 0 ? (
          movies?.map((item, i) => {
            item["media_type"] = "movie";
            return <CardComponent key={i} item={item} />;
          })
        ) : (
          <p className="mt-10 text-center">{t('noData')}</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-12">
        {totalPages > 1 && movies.length > 0 && (
          <Pagination totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default Movies;
