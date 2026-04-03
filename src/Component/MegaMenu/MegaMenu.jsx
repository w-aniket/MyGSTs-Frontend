import { useEffect, useState } from "react";
import "./MegaMenu.css";
import * as FaIcons from "react-icons/fa";

const MegaMenu = ({ categories }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (categories?.length > 0) {
      setActive(categories[0]);
    }
  }, [categories]);

  return (
    <div className="mega-menu">
      {/* LEFT SIDE */}
      <div className="mega-left">
        {categories?.map((cat) => {
          const Icon = cat.icon && FaIcons[cat.icon];
          return (
            <div
              key={cat._id}
              className={`mega-item ${active?._id === cat._id ? "active" : ""}`}
              onMouseEnter={() => setActive(cat)}
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
          return (
            <div key={sub._id} className="mega-column">
              <div className="mega-title">
                {SubIcon && <SubIcon className="mega-icon" />}
                {sub.name}
              </div>

              {sub.children?.map((child) => {
                const ChildIcon = child.icon && FaIcons[child.icon];
                return (
                  <div key={child._id} className="mega-link">
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
