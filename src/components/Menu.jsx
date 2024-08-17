import { IoIosMenu } from "../utils/icons";

const Menu = ({ toggleSidebar }) => {
  return (
    <>
      <div
        className="rounded-full p-1 hover:bg-slate-300 dark:hover:bg-neutral-700"
        onClick={toggleSidebar}
      >
        <IoIosMenu className="size-8 shrink-0 hover:cursor-pointer" />
      </div>
    </>
  );
};

export default Menu;
