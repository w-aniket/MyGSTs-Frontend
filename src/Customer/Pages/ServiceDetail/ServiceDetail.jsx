import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaLightbulb, FaFileAlt, FaPhoneAlt } from "react-icons/fa";
import ServiceRequestForm from "../../Components/ServiceRequestForm/ServiceRequestForm";
import "./ServiceDetail.css";

const IconFallback = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#E6F2FF" />
    <path d="M7 12l3 3 7-7" stroke="#1E90FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PastelIllustration = ({ className = "" }) => (
  // lightweight inline SVG pastel illustration (keeps asset-free)
  <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <defs>
      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#FDEFF8" />
        <stop offset="1" stopColor="#E8F7FF" />
      </linearGradient>
      <linearGradient id="g2" x1="0" x2="1">
        <stop offset="0" stopColor="#FFD3A5" />
        <stop offset="1" stopColor="#FFB5E8" />
      </linearGradient>
    </defs>

    <rect x="0" y="0" width="600" height="400" rx="20" fill="url(#g1)" />
    <g transform="translate(60,40)">
      <ellipse cx="220" cy="210" rx="120" ry="90" fill="#fff" opacity="0.35" />
      <path d="M10 250 Q120 80 320 220 Q470 340 540 160" stroke="url(#g2)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <circle cx="80" cy="90" r="34" fill="#BDECFD" />
      <circle cx="420" cy="60" r="24" fill="#FFE1D6" />
      <rect x="260" y="80" width="120" height="70" rx="12" fill="#fff" opacity="0.6" />
    </g>
  </svg>
);

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
   const sidebarRef = useRef(null);
  const stickyRef = useRef(null);
  const placeholderRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/services/${id}`);
        // backend response might be { service: {...} } or {...}, so normalize
        setService(res.data.service || res.data);
      } catch (err) {
        console.error("Error in fetching service", err);
        setErrorMsg("Failed to load service. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, apiUrl]);

   useEffect(() => {
    const sidebar = sidebarRef.current;
    const sticky = stickyRef.current;
    const placeholder = placeholderRef.current;
    if (!sidebar || !sticky || typeof window === "undefined") return;

    // compute limits
    const update = () => {
      const sidebarRect = sidebar.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const containerRect = sidebar.parentElement.getBoundingClientRect(); // .sd-grid column area

      // distance from top of document to top of sidebar
      const sidebarTopDoc = window.scrollY + sidebarRect.top;
      // distance from top of document to bottom boundary where sticky should stop
      const containerBottomDoc = window.scrollY + containerRect.top + containerRect.height;

      const stickPoint = sidebarTopDoc - 20; // when to start sticking (top:20px)
      const stickyHeight = stickyRect.height;
      const stopPoint = containerBottomDoc - stickyHeight - 20; // leave 20px gap from bottom

      if (window.scrollY >= stickPoint && window.scrollY <= stopPoint) {
        // make it fixed
        if (!isFixed) setIsFixed(true);
        // set width to match sidebar width so it doesn't collapse
        sticky.style.width = `${sidebarRect.width}px`;
        // set placeholder height so layout doesn't jump
        if (placeholder) {
          placeholder.style.height = `${stickyRect.height}px`;
          placeholder.classList.add("active");
        }
      } else {
        // unfix
        if (isFixed) setIsFixed(false);
        sticky.style.width = ""; // reset width
        if (placeholder) {
          placeholder.style.height = `0px`;
          placeholder.classList.remove("active");
        }
      }

      // if at bottom beyond stopPoint, align sticky to bottom of container
      if (window.scrollY > stopPoint) {
        // set transform to push it up so it doesn't overflow container
        const translateY = Math.max(0, window.scrollY - stopPoint);
        sticky.style.transform = `translateY(${-translateY}px)`;
      } else {
        sticky.style.transform = "";
      }
    };

    // run once to set initial
    update();

    // throttled listener
    let rAF = null;
    const onScroll = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [isFixed]);

  if (loading) {
    return (
      <div className="sd-page">
        <div className="sd-container sd-loading">
          <p>Loading service details…</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="sd-page">
        <div className="sd-container sd-error">
          <p>{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="sd-page">
        <div className="sd-container sd-empty">
          <p>Service not found.</p>
        </div>
      </div>
    );
  }

  // helpers for graceful fallbacks
  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const features = Array.isArray(service.features) ? service.features : [];
  const documents = Array.isArray(service.documents) ? service.documents : [];
  const title = service.title || "Service";
  const description = service.description || service.shortDescription || "No description available.";
  const price = service.price || service.pricing || null;
  const banner = service.bannerImage || service.imageUrl || null;
  const iconClass = service.icon || null;
  const iconBg = service.iconbg || "#1E90FF";

  return (
    <div className="sd-page">
      <div className="sd-container">

        {/* MAIN CONTENT + SIDEBAR LAYOUT */}
        <div className="sd-grid">

          {/* Left column: main information */}
          <div className="sd-main">
            {/* HERO */}
            <section className="sd-hero">
              <div className="sd-hero-left">
                <div className="sd-badge" style={{ background: iconBg }}>
                  {iconClass ? <i className={iconClass} aria-hidden style={{ color: "#fff", fontSize: 20 }} /> : <IconFallback size={22} />}
                </div>

                <h1 className="sd-title">{title}</h1>
                <p className="sd-sub">{description}</p>

                <div className="sd-quick-ctas">
                  <button 
                    className="btn primary"
                    onClick={() => {
                      document.querySelector(".sd-sidebar").scrollIntoView({ behavior: "smooth"})
                    }}
                  >
                    Start Now
                  </button>
                  <button 
                    className="btn ghost"
                    onClick={() => window.open("https://wa.me/918830078732")}
                  >Talk to Expert</button>
                </div>

                {/* Quick highlights */}
                {benefits.length > 0 && (
                  <div className="sd-highlights">
                    {benefits.slice(0, 4).map((b, i) => (
                      <div className="hl-card" key={i}>
                        <div className="hl-icon">
                          {/* bold vector accent */}
                          <FaLightbulb size={18} />
                        </div>
                        <div className="hl-text">{b}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: pastel illustration or image */}
              <div className="sd-hero-right">
                {banner ? (
                  <img src={banner} alt={`${title} banner`} className="sd-banner-img" />
                ) : (
                  <PastelIllustration className="sd-illustration" />
                )}
              </div>
            </section>

            {/* FEATURES: grid with icon + short blurb */}
            {features.length > 0 && (
              <section className="sd-features">
                <h2>Features</h2>
                <div className="features-grid">
                  {features.map((f, idx) => {
                    // feature might be string or { title, points }
                    const label = typeof f === "string" ? f : f.title || f.name || `Feature ${idx + 1}`;
                    return (
                      <div className="feature-card" key={idx}>
                        <div className="feature-icon"><FaCheckCircle /></div>
                        <div className="feature-body">
                          <div className="feature-title">{label}</div>
                          {typeof f !== "string" && Array.isArray(f.points) && (
                            <div className="feature-points">
                              {f.points.slice(0, 3).map((p, i) => <div key={i} className="fp">{p}</div>)}
                              {f.points.length > 3 && <div className="fp more">+{f.points.length - 3} more</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* DOCUMENTS */}
            {documents.length > 0 && (
              <section className="sd-docs">
                <h2>Documents Required</h2>
                <div className="docs-grid">
                  {documents.map((d, i) => (
                    <div className="doc-item" key={i}>
                      <div className="doc-icon"><FaFileAlt /></div>
                      <div className="doc-text">{d}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PRICING (simple) */}
            {price && (
              <section className="sd-pricing">
                <h2>Pricing</h2>
                <div className="price-block">
                  <div className="price-left">
                    <div className="price-amount">₹{price}</div>
                    <div className="price-note">Starting price</div>
                  </div>
                  <div className="price-right">
                    <button 
                    className="btn primary"
                    onClick={() => {
                      document.querySelector(".sd-sidebar").scrollIntoView({ behavior: "smooth"})
                    }}
                    >
                      Get Started
                    </button>
                    <button 
                      className="btn outline"
                      onClick={() => window.open("https://wa.me/918830078732")}
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right column: sticky request form (moves below on mobile) */}
          <aside className="sd-sidebar" aria-label="Request service form" ref={sidebarRef}>
            <div ref={placeholderRef} className="sd-sticky-placeholder"/>
            <div
              className={`sd-sticky ${isFixed ? "fixed" : ""}`}
              ref={stickyRef}
              aria-hidden={false}
            >
              <div className="request-card">
                <div className="request-head">
                  <div className="req-icon"><FaPhoneAlt /></div>
                  <div>
                    <div className="req-title">Request this Service</div>
                    <div className="req-sub">Quick response in 24 hours</div>
                  </div>
                </div>

                <div className="request-form-wrapper">
                  <ServiceRequestForm pricing= {service.pricing} />
                </div>

                <div className="request-foot">
                  <small>Or call us directly at <strong>+91 88300 78732</strong></small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
