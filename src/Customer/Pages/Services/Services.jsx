import React, { useEffect, useState } from "react";
import "./Services.css";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SkeletonServiceCard from "../../../Component/SkeletonLoading/SkeletonServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/services/all`)
      .then((res) => {
        setServices(res.data.services);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
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
        <link rel="canonical" href="https://www.mygsts.in/services" />
      </Helmet>

      {/* INTRO SECTION */}


      {/* SERVICES LIST */}
      <section id="services" className="main-services-container">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonServiceCard key={i} />)
          : services.map((service) => (
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

            <header className="services-hero">
        <div className="services-hero-container">
          {/* LEFT CONTENT */}
          <div className="hero-left">
            <h1>GST, ITR & Business Compliance Services in India</h1>

            <p>
              Simplify your business compliance with MyGSTs. We provide GST
              filing, ITR filing, MSME registration, accounting, tax audits, and
              complete compliance solutions for startups and businesses across
              India.
            </p>

            <div className="hero-buttons">
              <a href="/contact" className="primary-btn">
                Get Free Consultation
              </a>

              <a href="#services" className="secondary-btn">
                Explore Services
              </a>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="hero-right">
            <div className="trust-item">
              ✓ <span>1000+ Businesses Served</span>
            </div>

            <div className="trust-item">
              ✓ <span>Expert CA Support</span>
            </div>

            <div className="trust-item">
              ✓ <span>100% Online Process</span>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Services;
