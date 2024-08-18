import { baseImgPath } from "../services/api";
import { Link } from "react-router-dom";
import { getYear } from "../utils/helpers";
import { FaStar } from "../utils/icons";

const CardComponent = ({ item, small }) => {
  return (
    <div className="flex flex-col">

      <Link to={`/${item?.media_type}/${item?.id}`}>
        <div className={`${small ? "w-28 sm:w-32 md:w-36 lg:w-40" : "w-32 sm:w-36 md:w-52"} shrink-0 rounded-lg overflow-clip relative hover:scale-105 transition-transition duration-300 group`}>
          <img
            className="h-full group-hover:brightness-50 dark:group-hover:opacity-50"
            src={`${baseImgPath}/${item.poster_path}`}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/400")
            }
          />
          <div className="absolute bottom-0 left-0 right-0 w-full min-h-[70%] flex flex-col justify-between bg-black py-3 px-3 opacity-85 translate-y-full group-hover:translate-y-0 transition-transform duration-300 max-sm:hidden">
            <div className="uppercase text-[12px] text-yellow-200 font-bold">
              {`${item?.media_type}`}
            </div>
            <h3 className="mt-1 text-cyan-500 text-xs lg:text-sm font-bold text-center">
              {item?.title || item?.name}
            </h3>
            <div className="mt-1 text-sm text-center text-white">
              {getYear(item)}
            </div>
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
