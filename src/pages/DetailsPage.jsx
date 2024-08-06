import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseImgPathOriginal, fetchDetails } from "../services/api";
import Spinner from "../components/Spinner";
import { onePieceDetails } from "../data/data";
import CircularProgress from "../components/CircularProgress";
import { FaRegCalendarAlt } from "../utils/icons";


const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  // useEffect(() => {
  //   setLoading(true);
  //   fetchDetails(type, id)
  //     .then((results) => {
  //       setDetails(results);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setDetails(onePieceDetails)
    setLoading(false)
  }, []);

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
        <div className="text-white space-y-4">
          <h1 className="font-roboto font-bold text-3xl">
            {title + " "}<span className="text-gray-400 font-normal">{new Date(releaseDate).getFullYear()}</span>
          </h1>
          <div className="flex items-center gap-2">
            <FaRegCalendarAlt />
            <div>
              {`${new Date(releaseDate).toLocaleDateString('en-US')} (US)`} 
            </div>
          </div>
          <CircularProgress
            progress={45}
            size={55}
          />
        </div>
      </div>
    
    </div>
    </>
  );
};

export default DetailsPage;
