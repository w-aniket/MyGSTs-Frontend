import { useState } from "react";
import "./MegaMenu.css";

const MegaMenu = ({ categories }) => {
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="mega-menu">
      
      {/* LEFT SIDE */}
      <div className="mega-left">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={`mega-item ${active._id === cat._id ? "active" : ""}`}
            onMouseEnter={() => setActive(cat)}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="mega-right">
        {active?.children?.map((sub) => (
          <div key={sub._id} className="mega-column">
            <div className="mega-title">{sub.name}</div>

            {sub.children?.map((child) => (
              <div key={child._id} className="mega-link">
                {child.name}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MegaMenu;