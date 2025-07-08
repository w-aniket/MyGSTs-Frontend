import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { UserContext } from "../../../UserContex/UserContext";
import ProfileLogo from "../ProfileLogo/ProfileLogo";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, loadingUser } = useContext(UserContext);
  const dropdownRef = useRef(null);

  // console.log("This is user",user);

  const navigation = [
    { name: "Home", 
      href: "/",
      current: location.pathname === "/" 
    },
    {
      name: "Services",
      href: "/services",
      current: location.pathname === "/services",
    },
    {
      name: "About Us",
      href: "/about",
      current: location.pathname === "/about",
    },
    {
      name: "Resources",
      href: "/resources",
      current: location.pathname === "/resources",
    },
    {
      name: "Careers",
      href: "/careers",
      current: location.pathname === "/careers",
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
            <Bars3Icon className="size-8 text-white" />
          </DisclosureButton>
        </div>

        {/* Logo */}
        <div className="navbar-logo">
          <CasesRoundedIcon className="text-white" />
        </div>

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

        {loadingUser ? (
          <span className="spinner"></span>
        ) : user ? (
          <ProfileLogo />
        ) : (
          <button id="signup" onClick={() => navigate("/signup")}>
            Register
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="mobile-menu">
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
