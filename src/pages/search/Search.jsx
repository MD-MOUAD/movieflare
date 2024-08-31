import { useEffect, useState } from "react";
import { searchMulti } from "../../services/api";
import { BiCameraMovie, FaSearch, FaTimes } from "../../utils/icons";
import { Link } from "react-router-dom";
import CardComponent from "../../components/CardComponent";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    if (debouncedQuery && debouncedQuery !== "") {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await searchMulti(debouncedQuery, page);
          const nextData = await searchMulti(debouncedQuery, page + 1);
          setTotalPage(data?.total_pages);
          setSearchResults([...data?.results, ...nextData?.results]);
        } catch (error) {
          console.log("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [debouncedQuery, page]);

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-red-500 dark:text-red-400 mt-10 py-12  max-sm:py-8">
        <Link  className="flex items-center justify-center scale-125" to={"/"}>
          <BiCameraMovie className="text-5xl max-sm:text-4xl" />
          <h1 className="text-4xl max-sm:text-3xl font-bold font-raleway bg-gradient-to-r from-red-400 via-red-900 to-red-600 bg-clip-text text-transparent tracking-wide">
            <span className="text-5xl max-sm:text-4xl">M</span>ovie
            <span className="text-5xl max-sm:text-4xl">F</span>lare
          </h1>
        </Link>
      </div>
      <div className="mx-5 px-8 h-14 rounded-full w-[50vw]  flex justify-center items-center gap-2 bg-slate-300 dark:bg-gray-300 focus-within:ring-2 ring-red-400/20 dark:ring-red-600 shadow-lg text-black dark:text-gray-900 relative z-10 group">
        <input
          id="searchBar"
          type="text"
          placeholder="Search on website"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-5 h-full w-4/6 bg-inherit outline-none flex-1 placeholder:text-gray-600 dark:placeholder:text-inputColor"
        />
        <button
          className={`invisible ${
            debouncedQuery !== "" && "group-focus-within:visible"
          } cursor-pointer opacity-35 hover:scale-105 hover:opacity-100`}
          onClick={handleClear}
        >
          <FaTimes className="mr-6" />
        </button>
        <FaSearch className="text-red-500" size={20} />
      </div>
      <div className="mt-6 flex items-center justify-center flex-wrap gap-8 max-md:gap-6 max-sm:gap-3">
        {loading ? (
          <Spinner />
        ) : searchResults.length > 0 ? (
          searchResults?.map((item, i) => {
            if (!["movie", "tv"].includes(item.media_type)) {
              return;
            }
            return <CardComponent key={i} item={item} />;
          })
        ) : (
          <p class="mt-10 text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Looking for a movie?{" "}
            <span class="font-normal text-gray-600 dark:text-gray-400">
              Start typing to find it.
            </span>
          </p>
        )}
      </div>
      <div className="flex items-center justify-center mt-12">
        {totalPages > 1 && searchResults.length > 0 && (
          <Pagination totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default Search;
