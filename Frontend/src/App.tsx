import { Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
