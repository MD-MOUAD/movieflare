import DarkModeToggle from "./DarkModeToggle";
import Login from "./Login";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="h-16 bg-slate-200 dark:bg-neutral-900 py-4 px-6 max-md:px-2 flex justify-between items-center border-b-2 border-stone-500/5 dark:border-none shadow-md dark:shadow-sm dark:shadow-white/5  fixed inset-0 z-[999]">
      <Logo />
      <SearchBar />
      <div className="flex gap-4">
        <DarkModeToggle />
        <Login />
      </div>
    </div>
  );
};

export default Header;
