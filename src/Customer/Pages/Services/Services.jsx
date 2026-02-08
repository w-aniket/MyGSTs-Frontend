import React, { useEffect, useState } from "react";
import "./Services.css";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const [services, setServices] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/services`)
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, [apiUrl]);

  return (
    <main className="page-container">
      {/* SEO META */}
      <Helmet>
        <title>GST, ITR & Business Compliance Services in India | MyGSTs</title>
        <meta
          name="description"
          content="MyGSTs offers GST filing, ITR filing, MSME registration, accounting, tax audits, and complete business compliance services across India."
        />
        <link rel="canonical" href="https://www.mygsts.com/services" />
      </Helmet>

      {/* INTRO SECTION */}
      <header className="services-intro-word">
        {/* ✅ SEO H1 (STATIC & KEYWORD-RICH) */}
        <h1>Business, Tax & Compliance Services in India</h1>

        <p>
          MyGSTs is a professional digital CA services platform providing GST
          filing, ITR filing, MSME registration, accounting, tax audits, and
          end-to-end business compliance solutions for startups, entrepreneurs,
          and businesses across India.
        </p>
      </header>

      {/* SERVICES LIST */}
      <section className="main-services-container">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            title={service.title}
            icon={service.icon || "🔧"}
            iconbg={service.iconbg || "#e0e0e0"}
            features={service.features || []}
            serviceId={service._id}
          />
        ))}
      </section>
    </main>
  );
};

export default Services;
