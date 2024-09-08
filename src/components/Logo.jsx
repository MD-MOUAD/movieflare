import { BiCameraMovie } from "../utils/icons";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center text-red-500 dark:text-red-400">
      <BiCameraMovie className="text-4xl max-md:text-3xl max-sm:text-2xl" />
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent tracking-wide">
        <span className="text-xl sm:text-2xl md:text-3xl">M</span>ovie
        <span className="text-xl sm:text-2xl md:text-3xl">F</span>lare
      </h1>
    </Link>
  );
};

export default Logo;
