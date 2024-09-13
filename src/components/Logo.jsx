import { useLanguage } from "../context/LanguageContext";
import { BiCameraMovie } from "../utils/icons";
import { Link } from "react-router-dom";

const Logo = () => {
  const {language} = useLanguage();
  return (
    <Link to="/" className={`flex items-center text-red-500 dark:text-red-400 ${language === "ar-MA" && "flex-row-reverse"}`}>
      <BiCameraMovie className="text-xl sm:text-3xl md:text-4xl" />
      <h1 className="text-base sm:text-xl md:text-2xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent tracking-wide">
        <span className="text-lg sm:text-2xl md:text-3xl">M</span>ovie
        <span className="text-lg sm:text-2xl md:text-3xl">F</span>lare
      </h1>
    </Link>
  );
};

export default Logo;
