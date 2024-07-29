import { Link } from "react-router-dom";

const Sidebar = () => {
  const Links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Tv shows", path: "/shows" },
    { name: "Search", path: "/search" },
  ];
  return (
    <div className="max-sm:hidden fixed top-0 left-0 h-screen w-72 max-lg:w-64 dark:text-white border-r-2 border-stone-500/5 bg-slate-200 dark:bg-neutral-950">
      <div className="py-8 flex justify-center border-b-2 border-stone-900/5 dark:border-slate-100/5">
        <h1 className="text-3xl lg:text-4xl font-bold font-roboto bg-gradient-to-r from-cyan-400 via-sky-900 to-sky-950 bg-clip-text text-transparent tracking-wide">
          MovieLand
        </h1>
      </div>
      <ul className="flex-col space-y-4 pt-5">
        {Links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="block text-gray-800 hover:bg-gray-600 dark:text-slate-50 px-7 py-3"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
