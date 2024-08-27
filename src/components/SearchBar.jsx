import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "../utils/icons";
import { baseImgPath, searchMulti } from "../services/api";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const handleClear = () => {
    setDebouncedQuery("");
    setQuery("");
    setSearchResults([]);
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
          const data = await searchMulti(debouncedQuery);
          setSearchResults(data?.results);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [debouncedQuery]);

  return (
    <div className="mx-5 px-5 h-10 rounded-lg max-w-96  flex justify-center items-center gap-2 bg-slate-300 dark:bg-gray-50 focus-within:ring-2 ring-black dark:ring-red-600 shadow-lg text-black dark:text-gray-900 relative z-10 group max-sm:hidden">
      <input
        id="searchBar"
        type="text"
        placeholder="Search on website"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-5 h-full w-4/6 bg-inherit outline-none flex-1 placeholder:text-gray-600 dark:placeholder:text-inputColor"
      />
      <button
        className={`invisible ${debouncedQuery !== "" &&"group-focus-within:visible"} cursor-pointer opacity-35 hover:scale-105 hover:opacity-100`}
        onClick={handleClear}
      >
        <FaTimes />
      </button>
      <FaSearch
        className="text-red-500"
        size={20}
      />
      <ul className="hidden absolute top-full left-0  w-[140%] mt-2 rounded-lg bg-slate-200 dark:bg-neutral-900  max-h-[50vh] z-10 group-focus-within:block overflow-auto">
        {searchResults?.map((item, i) => {
          if (!["movie", "tv"].includes(item.media_type)) {
            return;
          }
          const title = item.name || item.title;
          const posterPath = baseImgPath + item.poster_path;
          return (
            <Link to={`${item.media_type}/${item.id}`} key={i}>
              <li className="flex gap-2 p-2 hover:bg-zinc-300 dark:hover:bg-zinc-400 text-gray-400 hover:text-black">
                <img src={posterPath} alt={title} className="w-12" />
                <div className="line-clamp-1 font-bold">{title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
