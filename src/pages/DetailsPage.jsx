import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BaseImgPathOriginal,
  baseImgPath,
  fetchCredits,
  fetchDetails,
  fetchVideos,
} from "../services/api";
import Spinner from "../components/Spinner";
import CircularProgress from "../components/CircularProgress";
import {
  FaCheckCircle,
  FaRegCalendarAlt,
  IoIosAdd,
  IoMdTime,
} from "../utils/icons";
import { ratingPercentage, minutesToHours } from "../utils/helpers";
import noProfileImg from "../assets/no-profile-img.svg";
import VideoComponent from "../components/VideoComponent";
import Similar from "../components/detailsPage_components/Similar";
import HomeLink from "../components/HomeLink";
import { useAuth } from "../context/useAuth";
import { useToast } from "@chakra-ui/react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import HomeRedirection from "../components/HomeRedirection";
import { useFirestore } from "../services/firestore";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [officialTrailers, setOfficialTrailers] = useState([]);
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const { addToWatchlist, checkInWatchlist, removeFromWatchlist } = useFirestore();
  const [addToWatchlistLoading, setAddToWatchlistLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const [detailsData, creditsData, VideosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        // Set Details
        setDetails(detailsData);

        // Set Cast
        setCast(creditsData?.cast);

        // Set officialTrailers
        const trailers = VideosData?.results?.filter(
          (video) =>
            video.type === "Trailer" &&
            video.official === true &&
            video.site === "YouTube"
        );
        setOfficialTrailers(trailers);
        // set Videos
        const vids = VideosData?.results
          ?.filter((video) => video?.type != "Trailer")
          ?.slice(0, 10);
        setVideos(vids);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [type, id]);

  useEffect(() => {
    if (user) {
      checkInWatchlist(user?.uid, id).then((result) => {
        setIsInWatchlist(result);
      });
    } else {
      setIsInWatchlist(false);
    }
  }, [id, user, checkInWatchlist]);

  const releaseDate = details?.release_date || details?.first_air_date;
  const title = details?.name || details?.title;

  const handleSaveToWatchlist = async () => {
    if (user) {
      const data = {
        id,
        type,
        title: details?.name || details?.title,
        releaseDate,
        poster_path: details?.poster_path,
        vote_average: details?.vote_average,
        overview: details?.overview,
      };
      const dataId = data?.id?.toString();
      await addToWatchlist(user?.uid, dataId, data, setAddToWatchlistLoading);
      const setToWatchList = await checkInWatchlist(user?.uid, dataId);
      setIsInWatchlist(setToWatchList);
    } else {
      toast({
        title: "Action Required",
        description: "Please log in to add to your watchlist.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const setToWatchList = await checkInWatchlist(user?.uid, id);
    setIsInWatchlist(setToWatchList);
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <HomeRedirection />;
  }

  return (
    <>
      {/* details */}
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
            className="w-72 rounded-lg max-md:w-60"
          />
          <div className="flex flex-col text-white space-y-2 max-lg:items-center">
            <h1 className="font-roboto font-bold text-3xl text-red-500 max-md:text-center">
              {title + " "}
              <span className="text-gray-400 font-normal">
                {new Date(releaseDate).getFullYear() || "N/A"}
              </span>
            </h1>
            <div className="flex max-sm:flex-col items-center gap-5 max-sm:gap-2 text-lg">
              <div className="flex items-center gap-2 text-white/75">
                <FaRegCalendarAlt />
                <div>
                  {releaseDate
                    ? `${new Date(releaseDate).toLocaleDateString(
                        "en-US"
                      )} (US)`
                    : "Unknown"}
                </div>
              </div>
              {type === "movie" ? (
                <div className="flex items-center gap-1 text-gray-300">
                  <IoMdTime className="size-5" />
                  <p>{minutesToHours(details?.runtime)}</p>
                </div>
              ) : (
                <span className="uppercase text-gray-300">({type})</span>
              )}
            </div>
            <div className="flex max-md:flex-col items-center gap-5 py-5">
              <CircularProgress
                progress={ratingPercentage(details?.vote_average)}
                size={55}
              />
              <p className="text-md lg:text-xl max-md:hidden">User Score</p>
              {isInWatchlist ? (
                <button
                  className="flex items-center justify-center w-52 px-3 py-2 border-2 rounded-md border-slate-200/20 text-green-400 font-bold bg-green-600/30 hover:bg-green-700/30 max-md:scale-125"
                  onClick={handleRemoveFromWatchlist}
                >
                  <FaCheckCircle size={20} className="mr-2" />
                  In watchlist
                </button>
              ) : (
                <button
                  className="flex items-center justify-center w-52 py-2 border-2 rounded-md border-slate-200/20 font-bold hover:bg-orange-300/10 max-md:scale-125"
                  onClick={handleSaveToWatchlist}
                >
                  <div className="mr-2 flex items-center">
                    {addToWatchlistLoading ? (
                      <ChakraSpinner />
                    ) : (
                      <IoIosAdd size={25} />
                    )}
                  </div>
                  Add to watchlist
                </button>
              )}
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
      <div className="mt-4 container mx-auto">
        {/* cast */}
        <h2 className="text-lg sm:text-xl font-roboto ml-2">
          {type == "tv" ? "Series" : "Top Billed"} Cast
        </h2>
        <div className="flex gap-5 pl-2 md:px-5 md:py-2 mt-4 mb-10 overflow-x-auto max-sm:scrollbar-none">
          {cast?.length === 0 && (
            <p className="mt-10 text-center">No cast found</p>
          )}
          {cast &&
            cast.map((item) => (
              <div key={item.id}>
                <div className="w-28 sm:w-32 md:w-36 lg:w-40 shrink-0 rounded-lg overflow-clip relative">
                  <img
                    className="h"
                    src={`${baseImgPath}/${item?.profile_path}`}
                    alt={`${item.name}-profile`}
                    onError={(e) => (e.currentTarget.src = noProfileImg)}
                  />
                </div>
                <p className="my-2 text-center font-bold">{item.name}</p>
                <p className="text-sm opacity-70 text-center">
                  {item.character}
                </p>
              </div>
            ))}
        </div>
        {/* Trailers */}
        <h2 className="text-lg sm:text-xl font-roboto ml-2 mb-4">
          Latest Trailer
        </h2>
        {officialTrailers.length > 0 ? (
          <VideoComponent id={officialTrailers[0]?.key} />
        ) : (
          <p className="mt-10 ml-32 py-5">No Trailers available</p>
        )}

        {/* Other Videos */}
        {videos?.length > 0 && (
          <h2 className="mt-8 text-lg sm:text-xl font-roboto ml-2 mb-4">
            Other Videos
          </h2>
        )}
        <div className="flex mt-5 overflow-x-auto gap-5">
          {videos &&
            videos.map((item) => {
              return (
                <div className="flex-shrink-0" key={item.key}>
                  <VideoComponent id={item?.key} small />
                  <p className="text-sm text-center font mt-2 mb-5 line-clamp-2">
                    {item?.name}
                  </p>
                </div>
              );
            })}
        </div>
        {/* similar */}
        <Similar itemId={id} mediaType={type} />
        <div className="flex justify-end pb-4">
          <HomeLink />
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
