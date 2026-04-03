import { useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import "./MenuItem.css";

const MenuItem = ({ item, isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const Icon = item.icon ? FaIcons[item.icon] : null;
  const ref = useRef();

  const handleMouseEnter = () => {
    if (isMobile) return;

    setOpen(true);

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 220; // match CSS

    // Better overflow detection
    if (rect.right + dropdownWidth > window.innerWidth) {
      setOpenLeft(true);
    } else {
      setOpenLeft(false);
    }
  };

const handleClick = (e) => {
  if (isMobile) {
    e.stopPropagation(); // 🔥 THIS LINE FIXES YOUR ISSUE
    setOpen(!open);
  }
};

  return (
    <div
      ref={ref}
      className="bp-menu-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
      onClick={(e) => handleClick(e)}
    >
<div className="bp-label">
  <div className="bp-left">
    {Icon && <Icon className="bp-icon" />}
    <span>{item.name}</span>
  </div>

  {item.children?.length > 0 && (
    <FaChevronRight className="bp-arrow" />
  )}
</div>

      {open && item.children?.length > 0 && (
        <div
          className={`bp-dropdown ${
            openLeft ? "left" : "right"
          } ${isMobile ? "mobile" : ""}`}
        >
          {item.children.map((child) => (
            <MenuItem key={child._id} item={child} isMobile={isMobile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;