import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="lg:ml-72 sm:ml-64">
        {children}
      </main>
    </>
  )
}

export default Layout;