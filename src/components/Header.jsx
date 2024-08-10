import DarkModeToggle from "./DarkModeToggle";
import Login from "./Login";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="lg:ml-64 bg-slate-200 dark:bg-zinc-900 py-4 px-6 max-md:px-2 flex justify-between border-b-2 border-stone-500/5 dark:border-none shadow-md shadow-dark">
      <DarkModeToggle />
      <SearchBar />
      <Login />
    </div>
  )
}

export default Header;