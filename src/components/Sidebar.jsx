import { FaFilm, FaHome, FaSearch, MdLiveTv } from "../utils/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const Links = [
    { name: "Home", path: "/", icon: (<FaHome />) },
    { name: "Movies", path: "/movies", icon: (<FaFilm />) },
    { name: "Tv shows", path: "/shows", icon: (<MdLiveTv />) },
    { name: "Search", path: "/search", icon: (<FaSearch />) },
  ];
  return (
    <div className="max-lg:hidden fixed top-0 left-0 h-screen w-64  dark:text-white bg-slate-200 dark:bg-neutral-950">
      <div className="py-4 flex justify-center border-b-2 border-stone-900/5 dark:border-slate-100/5">
        <h1 className="text-3xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent">
          <span className="text-4xl">M</span>ovie
          <span className="text-4xl">l</span>and
        </h1>
      </div>
      <ul className="flex-col space-y-4 pt-5">
        {Links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="flex items-center gap-3 font-bold text-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600 dark:text-slate-50 px-7 py-3"
            >
              {link.icon}
              <h2>{link.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
