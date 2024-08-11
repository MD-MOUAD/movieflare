import { BiCameraMovie } from "../utils/icons";

const Logo = () => {
  return (
    <div className="flex items-center text-red-700">
      <BiCameraMovie className="text-4xl max-sm:text-3xl" />
      <h1 className="text-2xl max-sm:text-xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent tracking-wide">
        <span className="text-3xl max-sm:text-2xl">M</span>ovie
        <span className="text-3xl max-sm:text-2xl">l</span>and
      </h1>
    </div>
  );
};

export default Logo;
