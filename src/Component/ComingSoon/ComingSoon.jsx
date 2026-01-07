import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./CommingSoon.css";
const ComingSoon = ({ title, description }) => {

  return (
    <>
      <Helmet>
        <title>{title} | MyGSTs</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="coming-soon">
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="coming-soon-actions">
          <Link to="/">Go to Home</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </main>
    </>
  );
};

export default ComingSoon;
