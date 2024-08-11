import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BaseImgPathOriginal,
  baseImgPath,
  fetchCredits,
  fetchDetails,
} from "../services/api";
import Spinner from "../components/Spinner";
import CircularProgress from "../components/CircularProgress";
import { FaCheckCircle, FaRegCalendarAlt, IoIosAdd } from "../utils/icons";
import { ratingPercentage } from "../utils/helpers";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const [detailsData, creditsData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
        ]);

        // Set Details
        setDetails(detailsData);

        // Set Cast
        setCast(creditsData?.cast);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [type, id]);

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
        <div className="relative container mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-10">
          <img
            src={`${baseImgPath}/${details.poster_path}`}
            alt="poster"
            className="w-72 rounded-lg"
          />
          <div className="flex flex-col text-white space-y-2 max-lg:items-center">
            <h1 className="font-roboto font-bold text-3xl text-red-500 max-md:text-center">
              {title + " "}
              <span className="text-gray-400 font-normal">
                {new Date(releaseDate).getFullYear()}
              </span>
            </h1>
            <div className="flex items-center gap-2 text-lg">
              <FaRegCalendarAlt />
              <div>{new Date(releaseDate).toLocaleDateString("en-US")}</div>
              <p className="uppercase text-base text-gray-300">({type})</p>
            </div>
            <div className="flex max-md:flex-col items-center gap-5 py-5">
              <CircularProgress
                progress={ratingPercentage(details?.vote_average)}
                size={55}
              />
              <p className="text-md lg:text-xl max-md:hidden">User Score</p>
              <button
                className="flex items-center px-3 py-2 border-2 rounded-md border-slate-200/20 font-bold hover:bg-orange-300/10 max-md:scale-125 "
                onClick={() => console.log("clicked")}
              >
                <IoIosAdd size={25} className="mr-1" />
                Add to watchlist
              </button>
              <button
                className="hidden items-center px-3 py-2 border-2 rounded-md border-slate-200/20 text-green-400 font-bold hover:bg-green-600/30 max-md:scale-125"
                onClick={() => console.log("clicked")}
              >
                <FaCheckCircle size={20} className="mr-2" />
                In watchlist
              </button>
            </div>
            <p className="italic text-gray-300 pb-2 max-sm:text-base">
              {details?.tagline}
            </p>
            <h3 className="font-bold text-lg">Overview</h3>
            <p className="text-lg text-white/75 pb-6">{details?.overview}</p>
            <div className="flex flex-wrap gap-2">
              {details?.genres?.map((genre) => (
                <div
                  key={genre?.id}
                  className="text-sm max-md:text-base font-bold uppercase p-2 rounded-sm bg-gray-700/60"
                >
                  {genre?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
