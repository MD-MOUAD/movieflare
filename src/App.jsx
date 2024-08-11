import Layout from "./components/Layout";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );
};

export default App;
