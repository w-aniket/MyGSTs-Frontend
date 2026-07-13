import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MegaMenu.css";
import * as FaIcons from "react-icons/fa";

const MegaMenu = ({ categories }) => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categories?.length > 0) {
      setActive(categories[0]);
    }
  }, [categories]);

  const handleNodeClick = (node) => {
    if (node.children?.length > 0) return; // has children — nothing to do here, it's just a hover target
    if (node.hasLandingPage) {
      navigate(`/courses/${node.slug}`);
    }
    // else: leaf, no landing page yet — no-op
  };

  return (
    <div className="mega-menu">
      {/* LEFT SIDE */}
      <div className="mega-left">
        {categories?.map((cat) => {
          const Icon = cat.icon && FaIcons[cat.icon];
          const hasChildren = cat.children?.length > 0;
          return (
            <div
              key={cat._id}
              className={`mega-item ${active?._id === cat._id ? "active" : ""} ${
                !hasChildren && !cat.hasLandingPage ? "disabled" : ""
              }`}
              onMouseEnter={() => setActive(cat)}
              onClick={() => handleNodeClick(cat)}
            >
              <div className="mega-left-item">
                {Icon && <Icon className="mega-icon" />}
                <span>{cat.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div className="mega-right">
        {active?.children?.map((sub) => {
          const SubIcon = sub.icon && FaIcons[sub.icon];
          const subHasChildren = sub.children?.length > 0;
          return (
            <div key={sub._id} className="mega-column">
              <div
                className={`mega-title ${!subHasChildren && !sub.hasLandingPage ? "disabled" : ""}`}
                onClick={() => handleNodeClick(sub)}
              >
                {SubIcon && <SubIcon className="mega-icon" />}
                {sub.name}
              </div>

              {sub.children?.map((child) => {
                const ChildIcon = child.icon && FaIcons[child.icon];
                return (
                  <div
                    key={child._id}
                    className={`mega-link ${child.hasLandingPage ? "clickable" : "disabled"}`}
                    onClick={() => handleNodeClick(child)}
                  >
                    {ChildIcon && <ChildIcon className="mega-icon small" />}
                    {child.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MegaMenu;