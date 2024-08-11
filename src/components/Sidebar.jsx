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
    <div className="max-lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-52 dark:text-white bg-slate-200 dark:bg-neutral-900">
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
