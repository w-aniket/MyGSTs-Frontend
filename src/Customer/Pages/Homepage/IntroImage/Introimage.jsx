import "./IntroImage.css";
import { Link } from "react-router-dom";

const introImage =
  "https://res.cloudinary.com/diricpliu/image/upload/v1767189434/pexels-khwanchai-4175023_wufjzu.jpg";

const Intro = () => {
  return (
 <section
      className="home hero"
      style={{ backgroundImage: `url(${introImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="text-content">

          <span className="hero-tag">Trusted Online Accounting & Tax Services in India</span>

          <h1>
            Smart Accounting & Tax Solutions <br />
            <span className="highlight">Built for Growing Indian Businesses</span>
          </h1>

          <p>
Professional online accounting, GST, and income tax services designed for startups, professionals, and businesses across India. From compliance to audits, MyGSTs delivers fast, accurate, and reliable solutions—fully remote, fully secure.
          </p>

          <Link to="/contact" className="hero-cta">
            Get Free Consultation
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
