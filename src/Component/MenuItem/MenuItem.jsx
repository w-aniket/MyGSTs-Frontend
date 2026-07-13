import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import "./MenuItem.css";

const MenuItem = ({ item, isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const Icon = item.icon ? FaIcons[item.icon] : null;
  const ref = useRef();
  const navigate = useNavigate();

  const hasChildren = item.children?.length > 0;
  const isDisabledLeaf = !hasChildren && !item.hasLandingPage;

  const handleMouseEnter = () => {
    if (isMobile) return;

    setOpen(true);

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 220; // match CSS

    if (rect.right + dropdownWidth > window.innerWidth) {
      setOpenLeft(true);
    } else {
      setOpenLeft(false);
    }
  };

  const handleClick = (e) => {
    if (hasChildren) {
      if (isMobile) {
        e.stopPropagation(); // 🔥 keeps your existing mobile toggle fix
        setOpen(!open);
      }
      return; // desktop: hover already handles expansion, click on a parent does nothing
    }

    if (item.hasLandingPage) {
      navigate(`/courses/${item.slug}`);
    }
    // else: leaf with no landing page yet — no-op
  };

  return (
    <div
      ref={ref}
      className={`bp-menu-item ${isDisabledLeaf ? "disabled" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
      onClick={(e) => handleClick(e)}
    >
      <div className="bp-label">
        <div className="bp-left">
          {Icon && <Icon className="bp-icon" />}
          <span>{item.name}</span>
        </div>

        {hasChildren && <FaChevronRight className="bp-arrow" />}
      </div>

      {open && hasChildren && (
        <div
          className={`bp-dropdown ${openLeft ? "left" : "right"} ${isMobile ? "mobile" : ""}`}
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