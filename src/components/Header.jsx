import DarkModeToggle from "./DarkModeToggle";
import Login from "./Login";

const Header = () => {
  return (
    <div className="sm:ml-64 lg:ml-72 bg-slate-200 dark:bg-zinc-900 p-4 flex justify-between border-b-2 border-stone-500/5 dark:border-none shadow-md shadow-dark font-bebas">
      <DarkModeToggle />
      <Login />
    </div>
  )
}

export default Header;