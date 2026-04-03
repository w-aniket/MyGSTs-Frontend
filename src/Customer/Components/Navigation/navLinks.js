
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

  export default navLinks;