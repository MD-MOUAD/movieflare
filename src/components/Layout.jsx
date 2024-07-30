import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="lg:ml-62 md:ml-60 sm:px-5 max-sm:text-sm">
        {children}
      </main>
    </>
  )
}

export default Layout;