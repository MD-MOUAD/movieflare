import searchIcon from "../assets/icons/search.svg";

const SearchBar = () => {
  return (
    <div className="mx-5 px-5 h-10 rounded-3xl max-w-96  flex justify-center items-center bg-slate-300 dark:bg-gray-50 focus-within:ring-1 ring-cyan-500 dark:ring-sky-400 shadow-lg text-black dark:text-gray-300 relative z-10 group">
      <input type="text" placeholder="Search on website" className="px-5 h-full w-4/6 bg-inherit outline-none flex-1 placeholder:text-zinc-800 dark:placeholder:text-inputColor"/>
      <img src={searchIcon} alt="search bg-inherit" 
      className="w-6 cursor-pointer hover:scale-110" />
      <ul className="hidden absolute top-full left-0 right-0 w-full mt-2 rounded-lg bg-slate-200 dark:bg-white min-h-64 max-h-[50vh] z-10 group-focus-within:block overflow-auto">
        {[...Array(10)].map((_, i) => (
          <li 
            className="px-2 py-5 hover:bg-zinc-900 cursor-default" 
            key={i}
          >
            This is fake title
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar;