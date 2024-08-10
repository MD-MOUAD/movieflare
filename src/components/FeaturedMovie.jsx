import { BaseImgPathOriginal, baseImgPath } from "../services/api";
import { Link } from "react-router-dom";

const FeaturedMovie = ({ item }) => {
  const releaseDate = item?.release_date || item?.first_air_date;
  const title = item?.name || item?.title;
  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url("${BaseImgPathOriginal}/${item.backdrop_path})")`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-cover-gradient"></div>

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
            <p className="mt-2 md:mt-4 text-sm text-white/90 lg:text-lg max-md:hidden">
              {(item?.release_date && "Release") || "First Air"} Date:{" "}
              <span className="font-semibold text-red-400">{releaseDate}</span>
            </p>
            <p className="md:mt-2 text-sm text-white/90 lg:text-lg max-md:hidden">
              Genre: <span className="font-semibold text-red-400">{item.genres?.map(genre => genre.name).join(', ')}</span>
            </p>
            <p className="mt-4 xl:text-lg text-white/50 font-[500] line-clamp-2 max-md:hidden">
              {item?.overview}
            </p>
            <div className="mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-sm text-white font-semibold py-2 px-4 rounded-lg shadow-lg">
                <Link to={`${item?.media_type}/${item?.id}`}>Watch Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
