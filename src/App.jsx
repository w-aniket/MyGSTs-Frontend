import { useState } from "react";
import "./App.css";
import Navigation from "./Customer/Components/Navigation/Navigation";
import Footer from "./Customer/Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Customer/Components/Homepage/Homepage";
import CustomerRouters from "./Routers/CustomerRouters";
import ScrollToTop from "./Customer/Components/ScrollToTop";

function App() {
  const [count, setCount] = useState(0);

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
