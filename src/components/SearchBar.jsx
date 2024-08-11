import { FaSearch } from "../utils/icons";

const SearchBar = () => {
  return (
    <div className="mx-5 px-5 h-10 rounded-lg max-w-96  flex justify-center items-center bg-slate-300 dark:bg-gray-50 focus-within:ring-2 ring-black dark:ring-red-600 shadow-lg text-black dark:text-gray-900 relative z-10 group">
      <input
        id="searchBar"
        type="text"
        placeholder="Search on website"
        className="px-5 h-full w-4/6 bg-inherit outline-none flex-1 placeholder:text-gray-600 dark:placeholder:text-inputColor"
      />
      <FaSearch
        className="text-red-500 cursor-pointer hover:scale-110 hover:text-red-600"
        size={20}
      />
      <ul className="hidden absolute top-full left-0 right-0 w-full mt-2 rounded-lg bg-slate-200 dark:bg-white min-h-64 max-h-[50vh] z-10 group-focus-within:block overflow-auto">
        {[...Array(10)].map((_, i) => (
          <li
            className="px-2 py-5 hover:bg-zinc-300 cursor-pointer font-bold text-gray-400 hover:text-black"
            key={i}
          >
            This is fake title
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
