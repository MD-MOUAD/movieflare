import { BaseImgPathOriginal, baseImgPath } from "../services/api";
import { Link } from "react-router-dom";
const CoverComponent = ({item}) => {
  return (
    <Link to={`/`}>
      <div className="relative flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url("${BaseImgPathOriginal}/${item.backdrop_path})")` }}>
      <div className="absolute inset-0 bg-cover-gradient"></div>
      <div className="relative max-w-4xl mx-auto p-6 bg-opacity-75 backdrop-filter backdrop-blur-sm rounded-lg">
        <div className="flex flex-col md:flex-row items-center text-white">
          <img src={`${BaseImgPathOriginal}/${item.poster_path}`} alt="Movie Poster" className="w-48 md:w-64 rounded-lg shadow-lg opacity-65" />
          <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">{item?.name || item?.title}</h1>
            <p className="mt-4 text-lg">{item?.release_date && "Release" || "First air"} Date: <span className="font-semibold">{item?.release_date || item?.first_air_date}</span></p>
            {/* //TODO: fix later */}
            <p className="mt-2 text-lg">Genre: <span className="font-semibold">Action, Adventure</span></p>
            <p className="mt-4 text-sm md:text-base">{item?.overview}</p>
            <div className="mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg">Watch Trailer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default CoverComponent;