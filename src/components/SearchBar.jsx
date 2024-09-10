import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "../utils/icons";
import { baseImgPath, searchMulti } from "../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleClear = () => {
    setDebouncedQuery("");
    setQuery("");
    setSearchResults([]);
    document.querySelector('#search-bar').classList.add("max-sm:hidden");
    document.querySelector('#mobile-search-bar-arrow').classList.add("max-sm:hidden");
  };

  const handleMobileSearch = () => {
    document.querySelector('#search-bar').classList.toggle("max-sm:hidden");
    document.querySelector('#mobile-search-bar-arrow').classList.toggle("max-sm:hidden");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const fetchData = async () => {
        try {
          const data = await searchMulti(debouncedQuery, 1, language);
          setSearchResults(data?.results);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [debouncedQuery, language]);

  return (
    <>
      <div id="search-bar" className="px-5 h-10 rounded-lg sm:max-w-60 md:max-w-96 flex justify-center items-center gap-2 bg-slate-300 dark:bg-gray-50 sm:focus-within:ring-2 ring-black dark:ring-red-600 shadow-lg text-black dark:text-gray-900 relative z-10 max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-screen max-sm:h-12 max-sm:hidden group">
        <input
          id="searchBar"
          type="text"
          placeholder={t('searchOnWebsite')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 md:px-5 h-full w-4/6 bg-inherit outline-none flex-1 placeholder:text-gray-600 dark:placeholder:text-inputColor max-sm:rounded-lg"
        />
        <button
          className={`sm:invisible ${
            debouncedQuery !== "" && "group-focus-within:visible"
          } cursor-pointer sm:opacity-35 hover:scale-105 hover:opacity-100`}
          onClick={handleClear}
        >
          <FaTimes />
        </button>
        <FaSearch className="text-red-500 max-sm:hidden" size={20} />
        <ul className="hidden absolute top-full left-0  w-[140%] max-sm:w-full sm:mt-2 rounded-lg bg-slate-200 dark:bg-neutral-900  max-h-[50vh] z-10 group-focus-within:block overflow-auto">
          {searchResults?.map((item, i) => {
            if (!["movie", "tv"].includes(item.media_type)) {
              return;
            }
            const title = item.name || item.title;
            const posterPath = baseImgPath + item.poster_path;
            return (
              <Link to={`${item.media_type}/${item.id}`} key={i}>
                <li
                  className="flex gap-2 p-2 hover:bg-zinc-300 dark:hover:bg-zinc-400 text-gray-400 hover:text-black"
                  onClick={handleClear}
                >
                  <img
                    src={posterPath}
                    alt={"Poster"}
                    className="w-12 aspect-card"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/400")
                    }
                  />
                  <div className="line-clamp-2 font-bold">{title}</div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {/* for mobile */}
      <div className="relative text-red-500 sm:hidden cursor-pointer">
        <FaSearch size={18} onClick={handleMobileSearch} className="mx-2"/>
        <div id="mobile-search-bar-arrow" className="size-6 absolute top-8 left-1/2 -translate-x-1/2 rotate-45 bg-slate-300 dark:bg-gray-50  max-sm:hidden"></div>
      </div>
    </>
  );
};

export default SearchBar;
