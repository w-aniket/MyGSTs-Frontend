import React from "react";
import Footer from "../Customer/Components/Footer/Footer";
import Navigation from "../Customer/Components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
// import Homepage from "../Customer/Components/Homepage/Homepage";
import Signup from "../Customer/Auth/Signup";
import Signin from "../Customer/Auth/Signin";
import Reset from "../Customer/Auth/Reset";
import NewPassword from "../Customer/Auth/NewPassword.jsx";
import ScrollingText from "../Customer/Components/RunningText/ScrollingText";
import Services from "../Customer/Pages/Services/Services.jsx";
import About from "../Customer/Pages/About/About.jsx";
import Resources from "../Customer/Pages/Recources/Resources.jsx";
import Careers from "../Customer/Pages/Careers/Careers.jsx";
import ProfilePag from "../Customer/Components/ProfilePage/ProfilePag";
import Contact from "../Customer/Pages/ContactV2/Contact.jsx";
import Homepage from "../Customer/Pages/Homepage/Homepage.jsx";
import ServiceDetail from "../Customer/Pages/ServiceDetail/ServiceDetail.jsx";
import MyServiceRequests from "../Customer/Pages/MyRequests/MyServiceRequests.jsx";
import OTPLogin from "../Customer/Auth/OTPLogin.jsx";
import ContactWidget from "../Component/ContactWidget/ContactWidget.jsx";

const CustomerRouters = () => {
  return (
    <div>
      <div>
        <ScrollingText />
        <Navigation />
        
      <ContactWidget />
      </div>

      <Routes>
        
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<OTPLogin />} />
        <Route path="/signin/reset-password" element={<Reset />} />
        <Route path="/signin/new-password" element={<NewPassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/my-service-requests" element={<MyServiceRequests />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/profile" element={<ProfilePag />} />
        <Route path="/careers/appliedjob" element={<ProfilePag />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
