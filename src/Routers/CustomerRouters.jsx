import React from "react";
import Footer from "../Customer/Components/Footer/Footer";
import Navigation from "../Customer/Components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Signup from "../Customer/Auth/Signup";
import Signin from "../Customer/Auth/Signin";
import Reset from "../Customer/Auth/Reset";
import NewPassword from "../Customer/Auth/NewPassword.jsx";
import ScrollingText from "../Customer/Components/RunningText/ScrollingText";
import Services from "../Customer/Pages/Services/Services.jsx";
import AboutUs from "../Customer/Pages/About/AboutUs.jsx";
import Resources from "../Customer/Pages/Recources/Resources.jsx";
import Careers from "../Customer/Pages/Careers/Careers.jsx";
import ProfilePag from "../Customer/Components/ProfilePage/ProfilePag";
import Contact from "../Customer/Pages/ContactV2/Contact.jsx";
import Homepage from "../Customer/Pages/Homepage/Homepage.jsx";
import ServiceDetail from "../Customer/Pages/ServiceDetail/ServiceDetail.jsx";
import MyServiceRequests from "../Customer/Pages/MyRequests/MyServiceRequests.jsx";
import OTPLogin from "../Customer/Auth/OTPLogin.jsx";
import ContactWidget from "../Component/ContactWidget/ContactWidget.jsx";
import ServiceRequestConfirmation from "../Customer/Pages/MyRequests/ServiceRequestConfirmation.jsx";
import MyServiceRequestDetail from "../Customer/Pages/MyRequests/MyServiceRequestDetail.jsx";
import PrivacyPolicy from "../Customer/Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsAndConditions from "../Customer/Pages/TermAndConditions/TermsAndConditions.jsx";
import Security from "../Customer/Pages/Security/Security.jsx";
import CookieDeclaration from "../Customer/Pages/CookieDeclaration/CookieDeclaration.jsx";
import Claims from "../Customer/Pages/Claims/Claims.jsx";
import Support from "../Customer/Pages/Support/Support.jsx";

const CustomerRouters = () => {
  return (
    <div>
      <ScrollingText />
      <Navigation />
      <ContactWidget />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<OTPLogin />} />
        <Route path="/signin/reset-password" element={<Reset />} />
        <Route path="/signin/new-password" element={<NewPassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route
          path="/service-requests/confirmation/:id"
          element={<ServiceRequestConfirmation />}
        />
        <Route path="/my-service-requests" element={<MyServiceRequests />} />
        <Route
          path="/my-service-requests/:id"
          element={<MyServiceRequestDetail />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/profile" element={<ProfilePag />} />
        <Route path="/careers/appliedjob" element={<ProfilePag />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cookie-declaration" element={<CookieDeclaration />} />
        <Route path="/claim" element={<Claims />} />
        <Route path="/support" element={<Support />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
