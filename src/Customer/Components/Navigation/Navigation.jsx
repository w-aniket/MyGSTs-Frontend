// homepage navbar
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";
import ProfileLogo from "../ProfileLogo/ProfileLogo";
import Full_Logo from "../../../assets/Full_Logo.png";
import MenuItem from "../../../Component/MenuItem/MenuItem";
// import navLinks from "./NavLinks";
import MegaMenu from "../../../Component/MegaMenu/MegaMenu";
import "./Navigation.css";
import { getCategoriesTree } from "../../../Utils/APIs/categoryApi";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  // Better dropdown handling (future-proof)
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Services",
      href: "/services",
      current: location.pathname === "/services",
    },
    {
      name: "Be Practical",
      type: "dropdown",
      children: categories,
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
    const loadCategories = async () => {
      try {
        const data = await getCategoriesTree();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
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
          {navLinks.map((item) => {
            // ✅ Dropdown
            if (item.type === "dropdown") {
              return (
                <div
                  key={item.name}
                  className="mega-root nav-link"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span>{item.name}</span>

                  {openDropdown === item.name &&
                    (loading ? (
                      <div className="mega-loading">Loading...</div>
                    ) : (
                      <MegaMenu categories={item.children} />
                    ))}
                </div>
              );
            }

            // ✅ Normal Link
            return (
              <a
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`nav-link ${item.current ? "active" : ""}`}
              >
                {item.name}
              </a>
            );
          })}
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

        {navLinks.map((item) => {
          // ✅ Mobile Dropdown
          if (item.type === "dropdown") {
            return (
              <div key={item.name} className="bp-mobile-root nav-link">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  {item.name}
                </span>

                {mobileOpen && (
                  <div className="bp-mobile-dropdown">
                    {item.children.map((cat) => (
                      <MenuItem key={cat._id} item={cat} isMobile={true} />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // ✅ Normal Mobile Link
          return (
            <DisclosureButton
              key={item.name}
              as="a"
              onClick={() => navigate(item.href)}
              className="nav-link"
            >
              {item.name}
            </DisclosureButton>
          );
        })}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navigation;
