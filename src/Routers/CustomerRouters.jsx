import React from "react";
import Footer from "../Customer/Components/Footer/Footer";
import Navigation from "../Customer/Components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Customer/Components/Homepage/Homepage";
import Signup from "../Customer/Auth/Signup";
import Signin from "../Customer/Auth/Signin";
import Reset from "../Customer/Auth/Reset";
import NewPassword from "../Customer/Auth/NewPassword.jsx";
import ScrollingText from "../Customer/Components/RunningText/ScrollingText";
import Services from "../Customer/Components/Services/Services";
import About from "../Customer/Components/About/About";
import Resources from "../Customer/Components/Recources/Resources";
import Careers from "../Customer/Components/Careers/Careers";
import ProfilePag from "../Customer/Components/ProfilePage/ProfilePag";
import Contact from "../Customer/Components/ContactV2/Contact";

const CustomerRouters = () => {
  return (
    <div>
      <div>
        <ScrollingText />
        <Navigation />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin/reset-password" element={<Reset />} />
        <Route path="/signin/new-password" element={<NewPassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/profile" element={<ProfilePag />} />
        <Route path="/careers/appliedjob" element={<ProfilePag />} />
        <Route path="/careers/opportunities" element={<ProfilePag />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
