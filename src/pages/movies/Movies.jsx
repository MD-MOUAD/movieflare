import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import Pagination from "../../components/Pagination";


const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page);
        setMovies(data?.results);
        setTotalPage(data?.total_pages);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="container mx-auto py-2">
      <h2 className="text-lg sm:text-xl font-bold text-red-500 py-4 px-5">Discover Movies</h2>
      <div className="flex items-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
      {loading
          ? [...Array(20)].map((_, i) => <CardSkeleton key={i}/>)
          : movies?.map((item) => {
              item["media_type"] = "movie";
              return <CardComponent key={item.id} item={item} />;
            })}
      </div>
      <div className="flex items-center justify-center mt-12">
        {totalPages > 1 && (<Pagination totalPages={totalPages}  onPageChange={setPage}/>)}
      </div>
    </div>
  );
};

export default Movies;
