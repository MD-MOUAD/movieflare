import { useEffect, useState } from "react";
import { FaFilm, FaHome, FaSearch, MdLiveTv } from "../utils/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const path = useLocation().pathname;

  const [activeLink, setActiveLink] = useState(0);
  const Links = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome size={22} />,
      relatedPaths: ["home"],
    },
    {
      name: "Movies",
      path: "/movies",
      icon: <FaFilm size={22} />,
      relatedPaths: ["movie"],
    },
    {
      name: "Tv Shows",
      path: "/shows",
      icon: <MdLiveTv size={22} />,
      relatedPaths: ["tv", "show", "series"],
    },
    { name: "Search", path: "/search", icon: <FaSearch size={22} />, relatedPath: [] },
  ];

  useEffect(() => {
    Links.forEach((link, i) => {
      if (path.includes(link.path) || link.relatedPaths?.some((relatedPath) => path.includes(relatedPath))) {
        setActiveLink(i);
      }
    });
  }, [path]);

  return (
    <div
      className={`z-50 fixed top-16 left-0 h-[calc(100vh-4rem)]  dark:text-white bg-slate-200 dark:bg-neutral-900 transform ${
        isOpen
          ? "w-52 max-lg:w-72 max-sm:w-64 translate-x-0"
          : "w-20 max-lg:-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <ul className={`flex-col px-1 ${isOpen ? "pt-5 space-y-4" : "pt-1"}`}>
        {Links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              onClick={() => setActiveLink(index)}
              className={`flex items-center font-bold text-gray-800 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-700 dark:text-slate-50 ${
                isOpen
                  ? "px-7 py-3 gap-4"
                  : "flex-col justify-center gap-2 py-4 font-medium text-sm"
              } ${
                isOpen &&
                activeLink === index &&
                "bg-gray-400 dark:bg-neutral-700"
              }`}
            >
              <div className="text-red-600 dark:text-red-500">{link.icon}</div>
              <h2>{link.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
