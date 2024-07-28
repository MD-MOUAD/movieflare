import Layout from "./components/Layout";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App;