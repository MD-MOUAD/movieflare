import React from "react";
import { useEffect, useState } from "react";
import {
  FaFilm,
  FaHome,
  MdLiveTv,
  moviesGenreIcons,
} from "../utils/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const path = useLocation().pathname;

  const [activeLink, setActiveLink] = useState(0);
  const Links = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome size={22} />,
    },
    {
      name: "Movies",
      path: "/movies",
      icon: <FaFilm size={22} />,
    },
    {
      name: "Tv Shows",
      path: "/shows",
      icon: <MdLiveTv size={22} />,
    },
  ];

  useEffect(() => {
    Links.forEach((link, i) => {
      if (
        path === link?.path ) {
        setActiveLink(i);
      }
    });

    moviesGenreIcons.forEach((element, i) => {
      if (
        path === element?.path ) {
        setActiveLink(i + 3);
      }
    });
  }, [path]);

  const handleMobileCloseMenu = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }
  
  return (
    <div
      className={`z-50 fixed top-16 max-sm:top-14 left-0  dark:text-white bg-slate-200 dark:bg-neutral-900 transform ${
        isOpen
          ? "w-52 max-lg:w-72 max-sm:w-64 translate-x-0"
          : "w-20 max-lg:-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <div className="h-[calc(100vh-4rem)] max-sm:h-[calc(100vh-3.5rem)] overflow-y-auto">
        <ul className={`flex-col px-1 mb-5 ${isOpen ? "pt-5 space-y-4" : "pt-1"}`}>
          {Links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={handleMobileCloseMenu}
                className={`flex items-center font-extrabold text-gray-800 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-700 dark:text-slate-50 opacity-80 ${
                  isOpen
                    ? "px-7 py-3 gap-4"
                    : "flex-col justify-center gap-2 py-4 font-medium text-sm text-center"
                } ${
                  isOpen &&
                  activeLink === index &&
                  "bg-gray-400 dark:bg-neutral-700"
                }`}
              >
                <div>
                  {link.icon}
                </div>
                <h2>{link.name}</h2>
              </Link>
            </li>
          ))}
        </ul>
        <div className={`border-t-2 mx-2 mt-2  border-black/10 dark:border-white/10 opacity-60 font-normal ${isOpen ? "px-5 pt-4 pb-2" : "text-sm text-center p-1"}`}>
        Genres</div>
        <ul className={`flex-col px-1 ${isOpen ? "pt-2 space-y-4" : "pt-1"}`}>
          {moviesGenreIcons.map((genre, i) => {
            const index = i + 3;
            return (
              <li key={index}>
                <Link
                  to={genre.path}
                  className={`flex items-center  text-gray-800 rounded-lg font-[600] hover:bg-gray-400 dark:hover:bg-neutral-700 dark:text-slate-50 opacity-60 ${
                    isOpen
                      ? "px-7 py-3 gap-4"
                      : "flex-col justify-center gap-2 py-4 font-medium text-sm"
                  } ${
                    isOpen &&
                    activeLink === index &&
                    "bg-gray-400 dark:bg-neutral-700"
                  }`}
                >
                  {React.createElement(genre?.icon, {
                      className: "text-gray-800 dark:text-gray-400 text-2xl",
                      size: 30,
                    })}
                  <h2 className={`text-gray-800 dark:text-gray-300 ${isOpen ? "text": "text-center text-xs"}`}>{genre?.name}</h2>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
