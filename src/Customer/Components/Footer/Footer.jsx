import React from "react";
import "./Footer.css";
import fb from "../../../assets/facebook.png";
import X from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkedin.png";
import insta from "../../../assets/instagram.png";

const Footer = () => {
  return (
    <div className="footer rubik">
      <div className="sub_footer section_padding">
        <div className="sub_footer-links">
          <div className="sub_footer-links-div">
            <h4>Company</h4>
            <a href="#">
              <p>About</p>
            </a>
            <a href="#">
              <p>Blog</p>
            </a>
            <a href="#">
              <p>Press</p>
            </a>
            <a href="#">
              <p>Jobs</p>
            </a>
            <a href="#">
              <p>Partners</p>
            </a>
          </div>
          <div className="sub_footer-links-div">
            <h4>Solutions</h4>
            <a href="#">
              <p>Marketing</p>
            </a>
            <a href="#">
              <p>Analytics</p>
            </a>
            <a href="#">
              <p>Commerce</p>
            </a>
            <a href="#">
              <p>Insights</p>
            </a>
            <a href="#">
              <p>Support</p>
            </a>
          </div>
          <div className="sub_footer-links-div">
            <h4>Documentation</h4>
            <a href="#">
              <p>Guides</p>
            </a>
            <a href="#">
              <p>API Status</p>
            </a>
          </div>
          <div className="sub_footer-links-div">
            <h4>Legal</h4>
            <a href="#">
              <p>Claim</p>
            </a>
            <a href="#">
              <p>Privacy</p>
            </a>
            <a href="#">
              <p>T & C</p>
            </a>
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
              <p>
                <img src={insta} alt="" />
              </p>
              <p>
                <img src={linkedin} alt="" />
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="sub_footer-below">
          <div className="sub_footer-copyright">
            <p>@{new Date().getFullYear()} W. Aniket. All right reserved.</p>
          </div>
          <div className="sub_footer-below-links">
            <a href="#">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
