import DarkModeToggle from "./DarkModeToggle";
import Login from "./Login";

const Header = () => {
  return (
    <div className="sm:ml-64 lg:ml-72 bg-stone-400 dark:bg-neutral-900 p-4 flex justify-between">
      <DarkModeToggle />
      <Login />
    </div>
  )
}

export default Header;