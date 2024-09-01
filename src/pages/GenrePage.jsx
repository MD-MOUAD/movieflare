import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import CardComponent from "../components/CardComponent";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import { genresDict } from "../services/api";
import HomeRedirection from "../components/HomeRedirection";

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    if (!Object.keys(genresDict["movie"]).includes(id)) {
      setError(true);
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page, id, sortOption);
        const nextPageData = await fetchMovies(page + 1, id, sortOption);
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
  }, [sortOption, page, id]);

  if (error) {
    return <HomeRedirection />;
  }

  return (
    <div className="container mx-auto py-2">
      <div className="px-10 sm:px-20 sm:mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-2 sm:py-4">
            <h2>Genre: {genresDict["movie"][id]}</h2>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
        {loading ? (
          [...Array(20)].map((_, i) => <CardSkeleton key={i} />)
        ) : movies?.length > 0 ? (
          movies?.map((item, i) => {
            item["media_type"] = "movie";
            return <CardComponent key={i} item={item} />;
          })
        ) : (
          <p className="mt-10 text-center">No data found</p>
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
