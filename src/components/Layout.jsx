import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="lg:ml-64 max-sm:text-sm">
        {children}
      </main>
    </>
  )
}

export default Layout;