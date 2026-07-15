import {
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaChartLine,
  FaGlobeAsia,
  FaLock,
} from "react-icons/fa";
import { motion } from "framer-motion";

import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import { AnimatedCard } from "../../../Component/AnimatedCard/AnimatedCard";
import { Helmet } from "react-helmet-async";
import WhyChooseUs from "../../../Component/WhyChooseUs/WhyChooseUs";

// TODO: replace with real numbers once available
const stats = [
  { value: "500+", label: "Businesses Onboarded" },
  { value: "10K+", label: "Filings Processed" },
  { value: "50+", label: "Courses & Certifications" },
  { value: "100%", label: "Data Encrypted" },
];

// TODO: replace with real service list / copy if this differs from actual offerings
const services = [
  {
    icon: <FaFileInvoice />,
    title: "GST & Invoicing",
    desc: "GST registration, return filing, and invoice management in one place.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "ITR Filing",
    desc: "Income tax return filing for individuals, freelancers, and businesses.",
  },
  {
    icon: <FaChartLine />,
    title: "Accounting & Bookkeeping",
    desc: "Structured financial records, kept current and audit-ready.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "ShopAct & Import-Export",
    desc: "Business registration and licensing for local and cross-border trade.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    desc: "Encrypted, reliable payment processing for every transaction.",
  },
];

// TODO: swap in real names, roles, and photos — this is placeholder data
const team = [
  {
    initials: "PD",
    name: "Ganesh Wakchaure",
    role: "Senior Chartered Accountant",
    group: "ca",
  },
  {
    initials: "AJ",
    name: "Ananya Joshi",
    role: "GST Compliance Specialist",
    group: "ca",
  },
  {
    initials: "RK",
    name: "Aniket Wakchaure",
    role: "Lead Full-Stack Engineer",
    group: "tech",
  },
  {
    initials: "VS",
    name: "Aniket Kokane",
    role: "Product & Platform Lead",
    group: "tech",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
          About MyGSTs | Business, Tax & Compliance Services in India
        </title>
        <meta
          name="description"
          content="Learn about MyGSTs, a trusted digital CA platform for GST filing, ITR filing, accounting, invoicing, and business compliance services across India."
        />
        <link rel="canonical" href="https://www.mygsts.in/about-us" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MyGSTs",
            url: "https://www.mygsts.in",
            description:
              "Digital CA platform for GST, ITR, and business compliance in India",
            areaServed: "IN",
          })}
        </script>
      </Helmet>

      <main className="about-container">
        {/* Hero */}
        <div className="about-hero">
          <span className="hero-badge">GST &middot; ITR &middot; Tax &middot; Service Registration &middot; Courses</span>
          <h1>Compliance, simplified for Indian businesses</h1>
          <p>
            MyGSTs brings GST, tax filing, accounting, and business licensing
            onto one secure platform — built for founders, freelancers, and
            growing teams across India.
          </p>
          <button className="primary-btn" onClick={() => navigate("/services")}>
            Explore Services
          </button>
        </div>

        {/* Stats strip — signature element */}
        <div className="stats-strip">
          {stats.map((s, i) => (
            <div className="stat-block" key={i}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Mission — pull-quote treatment, deliberately not a card */}
        <div className="about-section">
          <motion.div
            className="mission-quote"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p>
              Our mission is to remove the complexity of GST and accounting,
              and deliver a secure, transparent, and easy-to-use platform for
              every Indian business — from first registration to daily
              filings.
            </p>
          </motion.div>
        </div>

        {/* What We Do — horizontal rows, distinct from card-grid sections below */}
        <div className="about-section">
          <h2>What We Do</h2>
          <div className="service-list">
            {services.map((s, i) => (
              <div className="service-row" key={i}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Our Team */}
        <div className="about-section">
          <h2>The Team Behind MyGSTs</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <AnimatedCard key={i} className={`team-card team-${member.group}`}>
                <div className="team-avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Vision + CTA combined */}
        <div className="about-cta">
          <h2>Get Started with MyGSTs</h2>
          <p>Take control of your GST and accounting today.</p>
          <button className="primary-btn cta-btn" onClick={() => navigate("/services")}>
            Get Started
          </button>
        </div>
      </main>
    </>
  );
};

export default AboutUs;