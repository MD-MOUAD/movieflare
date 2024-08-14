import { useEffect, useState } from "react";
import { fetchLatestTrailer, fetchUpcomingMovies } from "../../services/api";

const UpcomingSection = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await fetchUpcomingMovies()
        setUpcomingMovies(results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const renderLatestTrailers = async () => {
    const moviesWithTrailers = await Promise.all(upcomingMovies.map(async (movie) => {
      const latestTrailer = await fetchLatestTrailer(movie.id);
      return { ...movie, trailer: latestTrailer };
    }));
  
    return moviesWithTrailers.map(movie => (
      <div key={movie.id} className="movie-trailer">
        <h3>{movie.title}</h3>
        {movie.trailer ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.trailer.key}`}
            title={movie.trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    ));
  };
  
  return (
    <div className="upcoming-movies">
      {async () => {
        console.log(await renderLatestTrailers())
      }}
    </div>
  );
};

export default UpcomingSection;
