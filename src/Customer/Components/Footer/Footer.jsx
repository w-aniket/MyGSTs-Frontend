import React from "react";
import "./Footer.css";
import fb from "../../../assets/facebook.png";
import X from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkedin.png";
import insta from "../../../assets/instagram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer rubik">
      <div className="sub_footer section_padding">
        <div className="sub_footer-links">
          <div className="sub_footer-links-div">
            <h4>Company</h4>
            <Link to="/about-us">
              <p>About</p>
            </Link>
            <Link to="/contact">
              <p>Contact us</p>
            </Link>
            {/* <Link to="#">
              <p>Press</p>
            </Link> */}
            <Link to="/careers">
              <p>Jobs</p>
            </Link>
            {/* <Link to="#">
              <p>Partners</p>
            </Link> */}
          </div>
          <div className="sub_footer-links-div">
            <h4>Solutions</h4>
            {/* <Link to="#">
              <p>Marketing</p>
            </Link>
            <Link to="#">
              <p>Analytics</p>
            </Link>
            <Link to="#">
              <p>Commerce</p>
            </Link>
            <Link to="#">
              <p>Insights</p>
            </Link> */}
            <Link to="/support">
              <p>Support</p>
            </Link>
          </div>
          {/* <div className="sub_footer-links-div">
            <h4>Documentation</h4>
            <Link to="#">
              <p>Guides</p>
            </Link>
            <Link to="#">
              <p>API Status</p>
            </Link>
          </div> */}
          <div className="sub_footer-links-div">
            <h4>Legal</h4>
            <Link to="/claim">
              <p>Claim</p>
            </Link>
            <Link to="/privacy-policy">
              <p>Privacy</p>
            </Link>
            <Link to="/terms-and-conditions">
              <p>T & C</p>
            </Link>
          </div>
          <div className="sub_footer-links-div">
            <h4>Social Media</h4>
            <div className="socialmedia">
              <p>
                <img src={fb} alt="" />
              </p>
              <p>
                <img src={X} alt="" />
              </p>
              <Link to="https://www.instagram.com/mygsts.official/" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="" />
              </Link>
              <p>
                <img src={linkedin} alt="" />
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="sub_footer-below">
          <div className="sub_footer-copyright">
            <p>@{new Date().getFullYear()} W.Aniket All right reserved.</p>
          </div>
          <div className="sub_footer-below-links">
            <Link to="/terms-and-conditions">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </Link>
            <Link to="/privacy-policy">
              <div>
                <p>Privacy</p>
              </div>
            </Link>
            <Link to="/security">
              <div>
                <p>Security</p>
              </div>
            </Link>
            <Link to="/cookie-declaration">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
