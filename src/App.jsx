import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import ScrollToTop from "./Customer/Components/ScrollToTop";

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<CustomerRouters />} />
      </Routes>
    </>
  );
}

export default App;
