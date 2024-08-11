import { FaRegPlayCircle } from "../utils/icons";
import {
  BaseImgPathOriginal,
  baseImgPath,
  fetchGenreList,
} from "../services/api";
import { Link } from "react-router-dom";
import { createGenreDict, getYear, mapGenreIdsToNames } from "../utils/helpers";
import { FaStar } from "../utils/icons";
import { useEffect, useState } from "react";

const FeaturedMovie = ({ item }) => {
  const [genreDict, setGenreDict] = useState({ movie: {}, tv: {} });

  useEffect(() => {
    const fetchGenres = async () => {
      const movieGenres = JSON.parse(localStorage.getItem("movieGenres"));
      const tvGenres = JSON.parse(localStorage.getItem("tvGenres"));

      if (movieGenres && tvGenres) {
        setGenreDict({ movie: movieGenres, tv: tvGenres });
      } else {
        const [movieGenresData, tvGenresData] = await Promise.all([
          fetchGenreList("movie"),
          fetchGenreList("tv"),
        ]);
        const movieGenreDict = createGenreDict(movieGenresData);
        const tvGenreDict = createGenreDict(tvGenresData);

        localStorage.setItem("movieGenres", JSON.stringify(movieGenreDict));
        localStorage.setItem("tvGenres", JSON.stringify(tvGenreDict));

        setGenreDict({ movie: movieGenreDict, tv: tvGenreDict });
      }
    };

    fetchGenres();
  }, []);

  const title = item?.name || item?.title;


  return (
    <div
      className="relative bg-cover bg-center sm:rounded-md"
      style={{
        backgroundImage: `url("${BaseImgPathOriginal}/${item.backdrop_path})")`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-cover-gradient sm:rounded-md"></div>

      <div className="relative py-9 px-1 sm:p-6 md:p-12 rounded-lg sm:backdrop-filter sm:backdrop-blur-sm">
        <div className="flex items-center text-white w-fit max-w-7xl bg-opacity-75 ">
          <img
            src={`${baseImgPath}/${item.poster_path}`}
            alt="Movie Poster"
            className="w-28 md:w-48 rounded-lg shadow-lg opacity-65 max-sm:hidden"
          />
          <div className="ml-3 md:ml-6 text-left">
            <h1 className="text-5xl max-lg:text-4xl max-md:text-2xl max-sm:text-3xl font-bold text-white max-sm:backdrop-blur-sm">
              {title}
            </h1>
            <div className="flex gap-3 items-center mt-2 md:mt-4 max-md:hidden text-white/65 lg:text-lg">
              <p className="">{getYear(item)}</p>
              <div className="flex items-center gap-1 bg-slate-500/50 px-1 font-bold text-yellow-500 text-sm lg:text-base rounded-sm">
                <FaStar />
                {item?.vote_average?.toFixed(1)}
              </div>
            </div>
            <p className="md:mt-2 text-white/65 lg:text-lg max-md:hidden">
            {mapGenreIdsToNames(item?.genre_ids, genreDict[item?.media_type]).join(", ")}
            </p>
            <p className="mt-4 xl:text-lg text-white/50 font-[500] line-clamp-2 max-md:hidden">
              {item?.overview}
            </p>
            <div className="mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-sm text-white font-semibold py-2 px-3 rounded-lg shadow-lg">
                <Link
                  to={`${item?.media_type}/${item?.id}`}
                  className="flex gap-2 items-center"
                >
                  <FaRegPlayCircle className="size-4" />
                  <span>Watch Now</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
