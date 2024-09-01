import { baseImgPath, genresDict } from "../services/api";
import { Link } from "react-router-dom";
import { getYear, mapGenreIdsToNames } from "../utils/helpers";
import { FaStar } from "../utils/icons";
import { useState } from "react";

const CardComponent = ({ item, small }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-col">
      <Link to={`/${item?.media_type}/${item?.id}`}>
        <div
          className={`${
            small
              ? "w-28 sm:w-32 md:w-36 lg:w-40"
              : "w-28 sm:w-36 md:w-44 lg:w-48 xl:w-52"
          } shrink-0 rounded-lg overflow-clip relative sm:hover:scale-110 transition-transition duration-300 group aspect-card`}
        >
          <img
            className="h-full group-hover:brightness-50 dark:group-hover:opacity-50 w-full"
            src={`${baseImgPath}/${item.poster_path}`}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/400")
            }
            onLoad={() => setLoaded(true)}
          />
          {!loaded && (
            <div className="h-full w-full bg-gray-400 absolute top-0 left-0  flex justify-center items-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 w-full min-h-[70%] flex flex-col justify-between bg-black py-3 px-3 opacity-70 translate-y-full group-hover:translate-y-0 transition-transform duration-300 max-sm:hidden">
            <div className="mt-1 flex gap-10 items-center">
              <div className="uppercase text-[10px] text-yellow-200 font-bold">
                {`${item?.media_type}`}
              </div>
              <div className="text-sm max-md:text-xs text-center text-red-300 font-bold">
                {getYear(item)}
              </div>
            </div>
            <h3
              className={`mt-1 mb-2 text-cyan-500 text-xs  font-bold text-center ${
                small
                  ? "lg:text-sm xl:text-base"
                  : "sm:text-sm md:text-base lg:text-lg"
              } `}
            >
              {item?.title || item?.name}
            </h3>
            <p
              className={`text-center text-white ${
                small
                  ? "text-[8px] lg:text-xs"
                  : "text-[10px] md:text-xs font-bold"
              }`}
            >
              {mapGenreIdsToNames(item?.genre_ids, genresDict[item?.media_type])
                .slice(0, 3)
                .join(", ")}
            </p>
            <div className="mt-1 flex justify-center items-center gap-2 text-orange-400">
              <FaStar />
              {item?.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </Link>
      {/* display vote average only for mobile devices */}
      <div className="sm:hidden mt-1 flex justify-center items-center gap-2 text-yellow-600">
        <FaStar />
        {item?.vote_average?.toFixed(1)}
      </div>
    </div>
  );
};

export default CardComponent;
