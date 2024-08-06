import { BaseImgPathOriginal, baseImgPath } from "../services/api";
import { Link } from "react-router-dom";
const CoverComponent = ({ item }) => {
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

      <div className="relative p-6 md:p-12 rounded-lg">
        <div className="flex items-center text-white w-fit max-w-7xl bg-opacity-75 sm:backdrop-filter sm:backdrop-blur-sm">
          <img
            src={`${BaseImgPathOriginal}/${item.poster_path}`}
            alt="Movie Poster"
            className="w-28 md:w-48 rounded-lg shadow-lg opacity-65 max-sm:hidden"
          />
          <div className="mt-6 md:mt-0 ml-3 md:ml-6 text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-cyan-400 backdrop-filter backdrop-blur-sm">
              {title}
            </h1>
            <p className="mt-2 md:mt-4 text-sm lg:text-lg max-sm:hidden">
              {(item?.release_date && "Release") || "First air"} Date:{" "}
              <span className="font-semibold">{releaseDate}</span>
            </p>
            <p className="md:mt-2 text-sm lg:text-lg max-sm:hidden">
              Genre: <span className="font-semibold">Action, Adventure</span>
            </p>
            <p className="mt-4 xl:text-lg line-clamp-2 max-md:hidden">
              {item?.overview}
            </p>
            <div className="mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-sm text-white font-semibold py-2 px-4 rounded-lg shadow-lg">
                <Link to={`/`}>Watch Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverComponent;
