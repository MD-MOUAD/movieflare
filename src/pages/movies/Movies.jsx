import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import Pagination from "../../components/Pagination";
import FilterComponent from "../../components/FilterComponent";
import { FaFilm } from "../../utils/icons";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page, genre);
        setMovies(data?.results);
        setTotalPage(data?.total_pages);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, genre]);

  return (
    <div className="container mx-auto py-2">
      <section id="filter" className="mb-4">
        <div className="px-10 sm:px-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-4">
              <h2>Discover Movies</h2>
              <FaFilm size={22} />
            </div>
            <button
              onClick={() => {
                document.querySelector(".filter").classList.toggle("hidden");
              }}
              className="px-3 py-1 rounded-md bg-red-600 text-white"
            >
              Filter
            </button>
          </div>
        </div>
        <FilterComponent setGenre={setGenre} mediaType={"movie"} />
      </section>
      <div className="flex items-center justify-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
        {loading
          ? [...Array(20)].map((_, i) => <CardSkeleton key={i} />)
          : movies?.map((item) => {
              item["media_type"] = "movie";
              return <CardComponent key={item.id} item={item} />;
            })}
      </div>
      <div className="flex items-center justify-center mt-12">
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default Movies;
