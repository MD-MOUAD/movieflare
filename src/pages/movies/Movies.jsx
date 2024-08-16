import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data?.results);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center flex-wrap gap-8">
      {loading
          ? [...Array(20)].map((_, i) => <CardSkeleton key={i} />)
          : movies?.map((item) => {
              item["media_type"] = "movie";
              return <CardComponent key={item.id} item={item} />;
            })}
      </div>
    </div>
  );
};

export default Movies;
