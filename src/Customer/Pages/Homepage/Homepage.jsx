import React, { useEffect } from "react";
import IntroImage from "./IntroImage/Introimage.jsx";
import Services from "./ServicesPanel/Services.jsx";
import CareerInrto from "../../Components/CareerIntro/CareerInrto.jsx";
import WhyChooseUs from "../../../Component/WhyChooseUs/WhyChooseUs.jsx";
import HowItWorks from "../../../Component/HowItWorks/HowItWorks.jsx";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ContactForm from "../../../Component/ContactForm/ContactForm.jsx";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <Helmet>
        <title>
          MyGSTs - Professional Tax & Business Compliance Services in India
        </title>

        <meta
          name="description"
          content="MyGSTs offers GST filing, ITR filing, MSME registration, tax audits, and compliance services for individuals and businesses in India."
        />

      </Helmet>
      <main>
        <IntroImage />

        <section aria-labelledby="services">
          <Services />
        </section>

        <section aria-labelledby="why-choose-us">
          <WhyChooseUs />
        </section>

        <section id="how-it-works" aria-labelledby="how-it-works-title">
          <HowItWorks />
        </section>

        <section aria-labelledby="careers">
          <CareerInrto showButton={true} reverseLayout={true} />
        </section>

        <section aria-labelledby="contact">
          <ContactForm />
        </section>
      </main>
    </>
  );
};

export default Homepage;
