import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { UserContext } from "../../../UserContex/UserContext";
import ProfileLogo from "../ProfileLogo/ProfileLogo";
import Full_Logo from "../../../assets/Full_Logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(UserContext);
  const dropdownRef = useRef(null);

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Services",
      href: "/services",
      current: location.pathname === "/services",
    },
    {
      name: "Careers",
      href: "/careers",
      current: location.pathname === "/careers",
    },
    {
      name: "About Us",
      href: "/about-us",
      current: location.pathname === "/about-us",
    },
    // {
    //   name: "Resources",
    //   href: "/resources",
    //   current: location.pathname === "/resources",
    // },
        {
      name: "Support",
      href: "/support",
      current: location.pathname === "/support",
    },
    {
      name: "Contact Us",
      href: "/contact",
      current: location.pathname === "/contact",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Disclosure as="nav" className="navbar">
      <div className="navbar-container">
        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <DisclosureButton className="mobile-menu-button">
            <Bars3Icon className="menu-icon" />
          </DisclosureButton>
        </div>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={Full_Logo} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex nav-links">
          {navigation.map((item) => (
            <a
              key={item.name}
              onClick={() => navigate(item.href)}
              className={`nav-link ${item.current ? "active" : ""}`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Profile Section */}
        <div className="navbar-actions">
          {user ? (
            <>
              <button
                className="orders-btn"
                onClick={() => navigate("/my-service-requests")}
                title="My Service Requests"
              >
                <CasesRoundedIcon />
              </button>
              <ProfileLogo />
            </>
          ) : (
            <button id="signup" onClick={() => navigate("/signin")}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="mobile-menu">
        {user && (
          <DisclosureButton
            as="a"
            onClick={() => navigate("/my-service-requests")}
            className="nav-link"
          >
            My Service Requests
          </DisclosureButton>
        )}

        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            onClick={() => navigate(item.href)}
            className="nav-link"
          >
            {item.name}
          </DisclosureButton>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navigation;
