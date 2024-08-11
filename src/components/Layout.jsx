import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="min-h-screen  h-[200vh] mt-16  lg:ml-52 max-sm:text-sm rounded-tl-xl bg-slate-100 dark:bg-neutral-950">
        {children}
      </main>
    </>
  )
}

export default Layout;