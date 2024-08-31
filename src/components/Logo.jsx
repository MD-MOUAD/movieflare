import { BiCameraMovie } from "../utils/icons";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center text-red-500 dark:text-red-400">
      <BiCameraMovie className="text-4xl max-sm:text-3xl" />
      <h1 className="text-2xl max-sm:text-xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent tracking-wide">
        <span className="text-3xl max-sm:text-2xl">M</span>ovie
        <span className="text-3xl max-sm:text-2xl">F</span>lare
      </h1>
    </Link>
  );
};

export default Logo;
