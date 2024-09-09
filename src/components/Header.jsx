import DarkModeToggle from "./DarkModeToggle";
import ProfileAvatar from "./ProfileAvatar";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Menu from "./Menu";
import LanguageSelector from "./LanguageSelector";

const Header = ({ toggleSidebar }) => {

  return (
    <div className="h-16 max-sm:h-14 bg-slate-200 dark:bg-neutral-900 py-4 px-6 max-md:px-4 max-sm:px-1 flex justify-between items-center gap-4 border-b-2 border-stone-500/5 dark:border-none shadow-md dark:shadow-sm dark:shadow-white/5  fixed inset-0 z-50">
      <div className="flex gap-4 max-sm:gap-1 items-center">
        <Menu toggleSidebar={toggleSidebar} />
        <Logo />
      </div>
      <div className="flex gap-3 max-sm:gap-1 items-center">
        <SearchBar />
        <LanguageSelector/>
        <DarkModeToggle />
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default Header;
