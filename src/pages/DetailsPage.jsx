import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseImgPathOriginal, fetchDetails } from "../services/api";
import Spinner from "../components/Spinner";
import { onePieceDetails } from "../data/data";
import CircularProgress from "../components/CircularProgress";
import { FaCheckCircle, FaRegCalendarAlt, IoIosAdd } from "../utils/icons";
import { ratingPercentage } from "../utils/helpers";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchDetails(type, id)
      .then((results) => {
        setDetails(results);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setDetails(onePieceDetails)
  //   setLoading(false)
  // }, []);

  if (loading) {
    return <Spinner />;
  }

  const releaseDate = details?.release_date || details?.first_air_date;
  const title = details?.name || details?.title;
  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url("${BaseImgPathOriginal}/${details?.backdrop_path})")`,
        }}
      >
        <div className="absolute inset-0 bg-backdrop-gradient"></div>
        <div className="relative container mx-auto p-6 flex flex-col sm:flex-row items-center gap-10">
          <img
            src={`${BaseImgPathOriginal}/${details.poster_path}`}
            alt="poster"
            className="w-72 rounded-lg"
          />
          <div className="flex flex-col text-white space-y-2 max-md:items-center">
            <h1 className="font-roboto font-bold text-3xl text-cyan-500 max-md:text-center">
              {title + " "}
              <span className="text-gray-400 font-normal">
                {new Date(releaseDate).getFullYear()}
              </span>
            </h1>
            <div className="flex items-center gap-2 text-lg">
              <FaRegCalendarAlt />
              <div>{new Date(releaseDate).toLocaleDateString("en-US")}</div>
            </div>
            <div className="flex max-md:flex-col items-center gap-4 py-5">
              <CircularProgress
                progress={ratingPercentage(details?.vote_average)}
                size={55}
              />
              <p className="text-md lg:text-xl max-md:hidden">User Score</p>
              {/* <button className="border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200">
              Add to watchlist
            </button> */}
              <button
                className="flex items-center px-3 py-2 border-2 rounded-md border-slate-200/20 font-bold hover:bg-orange-300/10 max-md:scale-125 "
                onClick={() => console.log("clicked")}
              >
                <IoIosAdd size={25} className="mr-1" />
                Add to watchlist
              </button>
              <button
                className=" flex items-center px-3 py-2 border-2 rounded-md border-slate-200/20 text-green-400 font-bold hover:bg-green-600/30 max-md:scale-125"
                onClick={() => console.log("clicked")}
              >
                <FaCheckCircle size={20} className="mr-2" />
                In watchlist
              </button>
            </div>
            <p className="italic text-gray-300">{details?.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
